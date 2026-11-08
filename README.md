# Street Soccer 3D

## Run locally
1. Install Node.js 18 or newer.
2. In this folder run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.

The game client is `public/index.html`. Three.js is loaded from cdnjs; Socket.IO is served by this project.

## Multiplayer hosting
Deploy this Node project to a host that supports persistent WebSocket connections and set its port from the `PORT` environment variable. Players need to open the same hosted URL.

## Included gameplay updates
- Slide tackle cooldown set to 1.75 seconds with a countdown below the Croqueta card.
- In-match celebrations panel: SIUUU is unlocked by default; locked celebrations are greyed out and cannot be selected.
- Selecting an owned celebration performs its animation for five seconds; goal celebrations also play without text.
- Pass call uses a whistle and raised-hand indicator instead of text.
- Penalty CPU keeper shuffles side-to-side while the shooter aims.
- Added a Regular Field selector with 1v1, 2v2, 4v4 and 10v10 choices. 1v1 and 2v2 use a compact pitch, 4v4 uses a larger pitch, and 10v10 uses a full-size pitch.
- Regular Field always uses a grass surface, open touchlines, low-detail stadium seating and freestanding soccer goals. Street-court graffiti, chain-link fences and perimeter walls are disabled in this mode.
- Ball exits at the touchlines trigger a throw-in for the team that did not touch it last; pressing the configured Pass key throws toward the closest teammate from the sideline, with a raised-arm player animation.
- 10v10 AI retains its positional formation and limits active ball-chasing to two outfielders per team (four total).
- After your team scores, the celebration menu opens and waits for an unlocked choice; the scorer's 3D player model performs the selected SIUUU, knee-slide, arms-wide or backflip-style animation for five seconds. The Regular Field camera focuses the scorer for five seconds.
- A low-poly referee stands on the Regular Field touchline, whistles and signals when a foul is called. In 4v4 and 10v10 only, rear slide-tackle fouls can award a free kick; fouls inside the penalty area award a penalty.
- Free kicks and penalties are taken from the foul location or penalty spot. Defenders form a wall for free kicks (not penalties); holding the configured Shoot key charges power and releasing shoots with an automatic lift. CPU-awarded set pieces are taken automatically.

## Tests
Run `npm test` for a lightweight file/feature smoke test.


## Current scope note
The referee and set-piece systems are intentionally lightweight gameplay approximations: foul calls are triggered by a chance-based rear slide-tackle check, and free-kick/penalty shots use the game's normal ball physics with charge-based launch power. The crowd is represented by low-detail colored spectator blocks rather than animated audience characters. Player celebrations are procedural model animations, not motion-captured animations.


## Latest shop and celebration update

- Settings now includes a saved **Disable goal celebrations** option.
- Shop includes five additional skill moves (Body Feint, Step-over, Drag Back, Heel-to-Heel, V-Cut) and five additional celebrations (Point to the Sky, Calm Down, Heart Celebration, Spin & Point, Victory Jump).
- New celebration choices are locked until purchased; the default SIUUU remains unlocked.
