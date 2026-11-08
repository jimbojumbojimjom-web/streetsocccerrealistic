const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
for (const [label, needle] of [
  ['field margin startup fix', 'const M=30;'],
  ['1.75 second slide cooldown', 'p.scd=1.75'],
  ['celebration menu', 'celebration-panel'],
  ['disable celebrations setting', 'disable-celebrations'],
  ['saved disable celebrations preference', 'ss3d_disable_celebrations'],
  ['five additional skill moves', 'heeltoe'],
  ['five additional celebrations', 'Heart Celebration'],
  ['celebration settings suppress menu', 'if(disableCelebrations)return;'],
  ['five-second player celebration', 'activeCelebration={id,player:scorer,started:performance.now(),until:performance.now()+5000}'],
  ['celebration player animation', "cid==='flip'"],
  ['pass call hand indicator', 'call-hand'],
  ['CPU keeper shuffle', 'Math.sin(G.clock*3.6)'],
  ['regular field selector', '⚽ Regular Field'],
  ['regular 1v1/2v2/4v4/10v10 choices', "[['1v1','1v1gk'],['2v2','2v2gk'],['4v4','4v4'],['10v10','10v10']]"],
  ['open grass stadium', "REGULAR_FIELD?'grass'"],
  ['street-court graffiti hidden in regular field', 'if(!REGULAR_FIELD){\nconst tags='],
  ['street fencing hidden in regular field', 'if(!REGULAR_FIELD){\nconst fTex='],
  ['throw-in action', 'function doThrowIn()'],
  ['throw-in correct team', 'throwInTeam=1-lastTouchTeam'],
  ['referee model', 'world.userData.referee=ref'],
  ['foul and free-kick system', 'function awardSetPiece('],
  ['penalty decision', "freeKickPenalty?'PENALTY':'FREE KICK'"],
  ['defensive wall', 'const wall=freeKickPenalty?[]:players.filter'],
  ['free-kick power', 'freeKickCharge=Math.min(1,freeKickCharge+dt*.42)'],
  ['seven-second scorer camera unless celebrations are disabled', 'cameraFocusUntil=disableCelebrations?0:performance.now()+7000']
]) {
  if (!html.includes(needle)) throw new Error(`Missing ${label}`);
}
console.log('Street Soccer smoke tests passed.');
