const API_KEY = " RGAPI-4d0938f4-ea4e-45b7-90a6-0fb84056dbfa";
const REGION = "asia";
const PLATFORM = "jp1";

document.getElementById("checkBtn").addEventListener("click", async () => {
  const name = document.getElementById("gameName").value;
  const tag = document.getElementById("tagLine").value;

  const acc = await fetch(
    `https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${API_KEY}`
  ).then(r => r.json());
  const puuid = acc.puuid;

  const matches = await fetch(
    `https://${REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&count=20&api_key=${API_KEY}`
  ).then(r => r.json());

  let win = 0, lose = 0;

  for (const id of matches) {
    const m = await fetch(
      `https://${REGION}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
    ).then(r => r.json());

    const p = m.info.participants.find(x => x.puuid === puuid);
    p.win ? win++ : lose++;
  }

  const rate = Math.round((win / (win + lose)) * 100);
  document.getElementById("result").innerText = `：${rate}%（${win} ${lose}）`;
});
