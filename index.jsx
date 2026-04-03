import { useState, useEffect, useCallback } from "react";

const PLAN = buildPlan();

function buildPlan() {
  const weeks = [];
  const ex = (name, detail, coaching, mins, category) => ({ name, detail, coaching, mins, category });

  // ======== PHASE 1: FOUNDATION (Weeks 1-3) ========
  const p1Warmup = [
    ex("Light Jog", "2 laps around gym or 90 sec jog in place. Easy pace, not a sprint.", "LOOK FOR: Relaxed shoulders, arms swinging naturally. If he's tense or clenching fists, say \"Shake your hands out, stay loose.\" This sets the tone for the session.", 2, "warmup"),
    ex("Arm Circles", "20 forward, 20 backward. Start small (dinner plate size), gradually get bigger (hula hoop size).", "LOOK FOR: Smooth circles, not jerky. Shoulders should move freely. If he's rushing, say \"Slow it down, make each circle the same size.\" This warms the rotator cuff for throwing.", 1, "warmup"),
    ex("Band Pull-Aparts", "15 reps. Hold light band at chest height, arms straight out. Pull band apart until hands are wide, then slowly return. Palms face the ceiling.", "LOOK FOR: Shoulder blades squeezing together at the end of each rep (like he's pinching a pencil between them). If his elbows bend, say \"Lock your arms straight, only your shoulders do the work.\" This protects his throwing shoulder all summer.", 2, "warmup"),
    ex("Hip Circles", "10 each direction. Hands on hips, feet shoulder width. Draw big circles with his hips like stirring a giant pot.", "LOOK FOR: Full range of motion. If the circles are tiny, say \"Bigger, push your hips out as far as they go.\" Loose hips are critical for both pitching and hitting mechanics.", 1, "warmup"),
    ex("Wrist Rolls & Forearm Stretch", "Roll wrists in circles 30 sec each direction. Then extend one arm straight, palm up, and gently pull fingers down with other hand for 15 sec each wrist.", "LOOK FOR: He should feel a gentle pull on the underside of the forearm during the stretch, not pain. If he's yanking his fingers, say \"Gentle, just until you feel the stretch.\" Forearm health prevents elbow issues in young pitchers.", 2, "warmup"),
  ];

  const p1StrengthA = [
    ex("Push-Ups", "2 sets of 8. Start in plank (hands under shoulders, body straight). Lower chest all the way to the floor, push back up. If he can't do full push-ups, drop knees to the ground but keep hips in line with shoulders.", "LOOK FOR: His body should look like a stiff board from head to heels (or head to knees). THE #1 MISTAKE at this age is the \"worm\" where hips sag and chest comes up first. If you see it, say \"Squeeze your belly button to your spine and push the whole board up at once.\" Also watch for flared elbows. His elbows should point about 45 degrees back, not straight out to the sides. Say \"Elbows toward your pockets, not toward the walls.\"", 4, "strength"),
    ex("Goblet Squat", "2 sets of 10. No weight in Phase 1. Feet shoulder width apart, toes pointed slightly out. Sit hips back and down like sitting into a low chair. Go as deep as he can while keeping heels flat.", "LOOK FOR: (1) Heels stay flat on the floor the whole time. If heels rise, his ankles are tight. Put a thin plate or folded towel under his heels until mobility improves. (2) Knees track over toes, not caving inward. If knees collapse in, say \"Push your knees out toward your pinky toes.\" (3) Chest stays tall. If his chest drops forward, say \"Pretend someone has a string pulling your chest to the ceiling.\" Squats build the leg drive that powers both pitching and hitting.", 4, "strength"),
    ex("Dead Bugs", "2 sets of 8 each side. Lie on back, arms straight up toward ceiling, knees bent at 90 degrees (shins parallel to floor). Slowly extend one arm overhead and the opposite leg straight out, hovering just above the floor, then return. Alternate sides.", "LOOK FOR: THE KEY IS HIS LOWER BACK. Slide your hand under the small of his back before he starts. His lower back should press your hand flat into the floor and NEVER lift off during the movement. If his back arches, say \"Press your back into my hand, make it flat like a pancake.\" If it's too hard, have him just extend the leg without moving the arm. This exercise teaches the core stability that prevents back pain from pitching.", 3, "strength"),
    ex("Plank Hold", "2 sets of 20 seconds. Forearms on ground, elbows under shoulders, body in a straight line. Hold still.", "LOOK FOR: Same \"stiff board\" as push-ups. Two common cheats: (1) Hips sagging (looks like a hammock), say \"Tuck your hips, squeeze your butt.\" (2) Hips piking up (butt in the air), say \"Drop your hips until your body is flat like a table.\" 20 seconds of a perfect plank is worth more than 60 seconds of a sloppy one.", 2, "strength"),
  ];

  const p1StrengthB = [
    ex("Light Band Rows", "2 sets of 10. Wrap band around a post at chest height. Hold both ends, step back until there's tension. Pull elbows straight back, squeezing shoulder blades together, then slowly release forward.", "LOOK FOR: (1) He should finish each rep with his elbows behind his body and shoulder blades pinched. If he's just bending his arms without the shoulder blade squeeze, say \"Pretend you're starting a lawnmower, pull and squeeze your back.\" (2) He shouldn't lean backward to cheat. His torso stays upright. If he's rocking, say \"Stand tall, only your arms move.\" This builds the back muscles that protect his shoulder when throwing.", 4, "strength"),
    ex("Bodyweight Lunges", "2 sets of 8 each leg. Step forward with one foot, lower back knee toward the ground (stop an inch above the floor), push back up to standing. Alternate legs.", "LOOK FOR: (1) Front knee should stay over the ankle, not shooting past the toes. If his knee drifts forward, say \"Bigger step, and sit down not forward.\" (2) His torso stays straight up. If he's leaning forward, say \"Chest up, eyes ahead.\" (3) Watch for wobbling. If balance is shaky, have him put one hand on a wall. Lunges build single-leg stability, which matters for the drive leg in pitching and the front leg in hitting.", 4, "strength"),
    ex("Bear Crawls", "2 sets of 20 feet down and back. Hands and feet on ground, knees hovering 1-2 inches off the floor. Crawl forward: move right hand and left foot at the same time, then left hand and right foot. Keep it slow.", "LOOK FOR: His knees should stay close to the floor (the hover is the hard part). If his butt shoots up and he looks like a dog walking, say \"Get lower, knees should almost touch the ground.\" Also watch for side-to-side rocking in his hips. Say \"Keep your hips quiet, like you're balancing a cup of water on your back.\" This builds total body coordination and core stability.", 3, "strength"),
    ex("Side Plank", "2 sets of 15 sec each side. Lie on one side, prop up on forearm (elbow under shoulder). Lift hips off ground so body forms a straight line from head to feet. Hold. Switch sides.", "LOOK FOR: Hips should be stacked and lifted, not sagging toward the floor. The most common issue is the top hip rolling forward or backward. Say \"Stack your hips on top of each other like pancakes.\" If 15 seconds is too hard, bend the bottom knee and prop on the knee instead of the foot.", 2, "strength"),
  ];

  const p1Cooldown = [
    ex("Shoulder Stretch", "Pull one arm across the chest with the other hand. Hold 20 sec each arm. Gentle pull, not yanking.", "LOOK FOR: The pulling hand should grip above the elbow, not on the elbow joint. He should feel the stretch in the back of the shoulder. If he says he doesn't feel anything, say \"Drop your shoulder down away from your ear, then pull.\" Prioritize the throwing arm.", 1, "cooldown"),
    ex("Sleeper Stretch", "Lie on the throwing arm side. Throwing arm out in front at 90 degrees, elbow bent 90 degrees. Gently push the hand toward the floor with the other hand. Very gentle, 20 sec.", "LOOK FOR: THIS IS A GENTLE STRETCH. If he's pushing hard, stop him. Say \"Just barely press, you should feel a light stretch in the back of your shoulder, nothing sharp.\" If it hurts, skip it. This stretch maintains internal rotation in the throwing shoulder, which is the first mobility to go in young pitchers.", 1, "cooldown"),
    ex("Hip Flexor Stretch", "Half-kneeling position: one knee on the ground, other foot flat in front (90-degree angle at both knees). Push hips gently forward. 20 sec each side.", "LOOK FOR: He should feel the stretch in the front of the hip on the kneeling side. If he arches his back instead of pushing hips forward, say \"Tuck your belt buckle under, squeeze the butt cheek on the kneeling side.\" Tight hip flexors kill pitching mechanics and batting rotation.", 1, "cooldown"),
    ex("Forearm Stretch", "Extend one arm straight, palm facing away. Use other hand to gently pull fingers back toward the body. 15 sec each wrist. Then flip: palm facing you, push fingers toward you.", "LOOK FOR: He should feel a pull along the forearm. If he's bending the elbow, say \"Keep the arm totally straight.\" Both directions matter: palm-away stretches the inside (for gripping the bat), palm-toward stretches the outside (for wrist snap in pitching).", 1, "cooldown"),
  ];

  const p1PitchDay = (strengthSet) => [
    ...p1Warmup,
    ex("Short-Distance Accuracy", "25 throws from 30-35 feet at a target (hang a towel, use tape on the net, or a bucket). Throw at 60-70% effort, not hard. The goal is hitting the target, not velocity.", "COACHING GUIDE: Stand behind him and watch the full motion. WHAT GOOD LOOKS LIKE: (1) He starts balanced on the back foot, (2) his front hip opens toward the target BEFORE the arm comes forward (this is \"leading with the hips\"), (3) the ball releases out front, roughly even with his front foot, not behind his head. COMMON MISSES AND FIXES: If he's missing HIGH consistently, he's releasing too early (ball leaves his hand when his arm is still going up). Say \"Let it go later, reach out toward the target.\" If he's missing LEFT (for a righty), his front shoulder is flying open too soon. Say \"Keep your glove shoulder pointed at the target longer, don't spin open.\" If he's missing LOW, his arm is dragging and releasing late. Say \"Get your arm up, throw over the top.\" COUNT HITS: Tell him to call his target before each throw. Track how many he hits out of 25. Write the number down. This becomes his baseline.", 18, "pitching"),
    ex("Target Challenge", "10 throws. Divide the target zone into 4 quadrants (tape an X on the net or imagine it). Call a quadrant before each throw: top-left, top-right, bottom-left, bottom-right.", "COACHING GUIDE: This is a game, not a drill. Make it competitive. Track score: 2 points for the called quadrant, 1 point for adjacent, 0 for a total miss. Anything over 10 points is solid for Week 1. Don't correct mechanics during this drill. Let him compete. If he's getting frustrated with misses, say \"Pick the spot, trust your arm, and let it fly. You already practiced the mechanics.\" After the drill, if one quadrant was consistently missed, note it for next session's accuracy work.", 7, "pitching"),
    ...strengthSet,
    ...p1Cooldown,
  ];

  const p1HitDay = (strengthSet) => [
    ...p1Warmup,
    ex("Tee Work", "15 swings off a batting tee. Set tee at belt height, middle of the plate. Focus on weight transfer: start with weight on back foot, shift forward into the swing, finish with weight on front foot.", "COACHING GUIDE: Stand to the side and watch his feet and hips. WHAT GOOD LOOKS LIKE: (1) Starts with a small load back (slight weight shift to back foot), (2) front foot steps forward (small step, not a lunge), (3) hips rotate BEFORE hands come through (the belly button should face the pitcher before the bat crosses the plate), (4) bat stays level through the zone, not chopping down or uppercutting. COMMON PROBLEMS: If he's popping up or hitting under the ball, his back shoulder is dropping. Say \"Stay tall, your shoulders should be level like a table when the bat comes through.\" If he's hitting weak grounders, he's likely rolling his wrists over too early. Say \"Palm up, palm down at contact\" (top hand faces up, bottom hand faces down at the moment of contact). If his feet aren't moving and he's all arms, say \"Let your hips do the work. Pretend you're squishing a bug with your back foot as you turn.\"", 8, "hitting"),
    ex("Cage Reps: Slow Speed", "20 swings against the pitching machine on the slowest comfortable setting. Focus on making solid contact, not power. Listen for the sound: a clean, solid crack means good barrel contact.", "COACHING GUIDE: Stand behind the cage netting and watch from the pitcher's perspective. THE SOUND TELLS YOU A LOT: a solid \"ping\" or crack means he's barreling it. A thin \"tick\" means he's getting jammed or catching it off the end. If you hear a lot of ticks: (1) Check his distance from the plate. Have him reach his bat across. The barrel should cover the outside edge. If not, move him closer. (2) Check his timing. If he's consistently late (hitting off the handle), say \"Start your swing a little earlier, see the ball and go.\" If he's out in front (hitting off the end), say \"Let it get a little deeper, be patient.\" If he's whiffing, slow the machine down further. Contact is the goal here, not ego about speed.", 12, "hitting"),
    ex("Two-Strike Drill", "10 swings. Choke up on the bat about an inch (hands slide up from the knob). Shorten the swing, focus on putting the ball in play. No big swings.", "COACHING GUIDE: This teaches a competitive mindset. Tell him before: \"Pretend you have 2 strikes and you cannot strike out. Your only job is to put the ball in play.\" LOOK FOR: A shorter, more compact swing. He should NOT be taking big cuts here. If he's still swinging for the fences, say \"Smaller swing. Just meet it. Line drive back up the middle is a win.\" The choked-up grip gives more bat control. If he's still whiffing, have him widen his stance slightly for better balance. This builds the mentality for when games get tight.", 5, "hitting"),
    ...strengthSet,
    ...p1Cooldown,
  ];

  for (let w = 1; w <= 3; w++) {
    weeks.push({
      week: w, phase: "Foundation", phaseNum: 1,
      objective: w === 1 ? "Learn the routine. Establish warm-up habits and baseline form." : w === 2 ? "Refine pitching mechanics. Build consistency in swing contact point." : "Solidify movement patterns. Should feel automatic entering Phase 2.",
      days: [
        { day: "Day 1", label: "Pitch + Push/Core", exercises: p1PitchDay(p1StrengthA) },
        { day: "Day 2", label: "Hit + Pull/Legs", exercises: p1HitDay(p1StrengthB) },
        { day: "Day 3", label: "Pitch + Pull/Legs", exercises: p1PitchDay(p1StrengthB) },
        { day: "Day 4", label: "Hit + Push/Core", exercises: p1HitDay(p1StrengthA) },
      ],
    });
  }

  // ======== PHASE 2: BUILD (Weeks 4-7) ========
  const p2Warmup = [
    ex("Jog + High Knees", "90 sec easy jog, then 20 high knees (drive knees up to hip height, pump arms).", "LOOK FOR: On high knees, he should be on the balls of his feet, not flat-footed. Knees should reach hip height. If he's shuffling, say \"Drive the knee up like you're marching in a parade.\" Arms pump opposite of legs (right knee up, left arm up).", 2, "warmup"),
    ex("Band Pull-Aparts", "15 reps. Same as Phase 1: chest height, pull band apart, squeeze shoulder blades.", "LOOK FOR: By now these should be smooth and controlled. If they're easy, have him pause for 1 second at the widest point (full squeeze). If his band feels like nothing, step to a slightly heavier band.", 1, "warmup"),
    ex("Band External Rotation", "10 each arm. Attach band to a post at elbow height. Stand sideways, elbow pinned to ribs, bent 90 degrees. Rotate forearm outward against the band. Slow both directions.", "LOOK FOR: The elbow MUST stay glued to his ribs the entire time. If his elbow drifts away from his body, he's cheating with his shoulder. Say \"Pin a towel between your elbow and your side. Don't let it fall.\" This directly strengthens the rotator cuff muscles that protect his arm when pitching. Critical exercise, never skip it.", 2, "warmup"),
    ex("Hip Hinges", "10 reps. Feet hip width, slight knee bend. Push hips straight back like closing a car door with your butt. Back stays flat. Feel hamstrings stretch. Stand back up by driving hips forward.", "LOOK FOR: His back should stay flat (no rounding). Place a hand on his lower back: if you feel it round, say \"Stick your chest out, pull your shoulders back.\" He should feel this in the back of his thighs (hamstrings). If he feels it in his lower back, he's rounding. This movement pattern is the foundation for squats with weight.", 1, "warmup"),
    ex("Arm Care Circuit", "10 band internal rotations each arm (opposite of external: rotate forearm inward against band) plus wrist rolls both directions.", "LOOK FOR: Same elbow-pinned-to-ribs rule as external rotation. These are small, controlled movements. If he's swinging his whole arm, the band is too heavy. These should feel like work but not a strain. The goal is warming up the small stabilizer muscles, not fatiguing them.", 2, "warmup"),
  ];

  const p2StrengthA = [
    ex("Push-Ups", "2 sets of 12. Full range of motion: chest to floor, arms fully extended at top. Slow on the way down (2 seconds), fast push up.", "LOOK FOR: Same cues as Phase 1 but he should be stronger now. The \"stiff board\" should be automatic. NEW CUE for this phase: slow the lowering. Count \"one-Mississippi, two-Mississippi\" on the way down. If he's dive-bombing, say \"Control it down, explode it up.\" If he can't do 12 good ones, do as many as he can with perfect form, rest 5 sec, finish the set. Never sacrifice form for a number.", 4, "strength"),
    ex("Goblet Squat", "2 sets of 10. NOW WITH WEIGHT: Hold a 5-10 lb dumbbell vertically at his chest, hands cupping the top end like holding a goblet. Same squat movement: sit back, chest up, heels flat.", "LOOK FOR: The dumbbell actually helps form because it counterbalances his weight and keeps his chest upright. If the weight pulls him forward, start with 5 lb. ALL THE SAME CUES from Phase 1 apply: heels flat, knees over toes (not caving), chest tall. NEW CUE: \"Elbows inside your knees at the bottom.\" At the bottom of the squat, his elbows should be between his knees, pushing them outward. This deepens the squat and opens his hips.", 4, "strength"),
    ex("Med Ball Rotation Throw", "2 sets of 6 each side. Stand sideways to a wall, 3-4 feet away. Hold a 2-4 lb medicine ball at hip level. Rotate hips explosively and throw the ball into the wall. Catch the bounce, reset, repeat. Do all 6 one direction, then switch sides.", "COACHING GUIDE: THIS IS THE MOST BASEBALL-SPECIFIC STRENGTH EXERCISE IN THE PLAN. Watch his hips: the throw should start from his back hip rotating forward, just like a pitch or a swing. WHAT GOOD LOOKS LIKE: His back foot pivots (heel comes off the ground), hips open toward the wall, THEN hands follow. If the ball is leaving his hands before his hips turn, say \"Hips first, hands second. Your hips are the engine, your hands just steer.\" If he's all arms (no hip rotation), have him exaggerate: do a rep in slow motion where he turns his belly button to the wall BEFORE he moves the ball. He should feel it in his obliques (sides of his torso) after a few reps.", 4, "strength"),
    ex("Dead Bugs", "2 sets of 10 each side. Same as Phase 1 but more reps. Back flat, opposite arm and leg extend, slow and controlled.", "LOOK FOR: Same lower-back test. By now his form should be solid. If it is, increase the challenge: have him pause for 2 seconds at full extension (arm overhead, leg out) before returning. If his back is still arching, he's not ready for the pause. Stay with the basic version.", 3, "strength"),
  ];

  const p2StrengthB = [
    ex("Dumbbell Rows", "2 sets of 10 each arm. One hand and one knee on a bench (or chair). Other hand holds 5-8 lb dumbbell hanging straight down. Pull dumbbell up to his hip, squeezing shoulder blade at top. Lower slowly.", "LOOK FOR: (1) His back should be flat like a table. If it rounds, say \"Stick your butt out, flatten your back.\" (2) The pull should end at his hip, not at his chest. Elbow goes straight back, not out to the side. Say \"Pull to your pocket, like you're starting a lawnmower.\" (3) No twisting. His shoulders should stay square. If his torso rotates to lift the weight, it's too heavy, drop to a lighter dumbbell. This builds the back muscles that decelerate his arm after every throw.", 4, "strength"),
    ex("Lateral Lunges", "2 sets of 8 each leg. Step wide to one side, push hips back and bend that knee, keeping the other leg straight. Push back to standing. Alternate sides.", "LOOK FOR: The bent knee should track over the toes (same as squat). The straight leg stays completely straight. If his straight leg bends, he's not stepping wide enough. Say \"Bigger step, push your butt back over your heel.\" He should feel this in the inner thigh of the straight leg and the glute/quad of the bent leg. This builds lateral stability for fielding and the push-off in pitching.", 4, "strength"),
    ex("Farmer's Carries", "2 sets of 40 feet. Hold 10 lb dumbbells in each hand. Walk with tall posture: shoulders down and back, chest up, core tight. Don't lean or waddle.", "LOOK FOR: His shoulders should not creep up toward his ears. Say \"Push your shoulders into your back pockets.\" He should walk in a straight line without side-to-side swaying. If he's leaning, the weight is too heavy, drop to 8 lb. This looks simple but it builds grip strength (for bat control), core stability, and posture. Have him focus on squeezing the dumbbells as hard as possible.", 3, "strength"),
    ex("Plank Shoulder Taps", "2 sets of 8 each side. In push-up position (arms straight), lift one hand and tap the opposite shoulder. Return hand to floor. Alternate. Go slow.", "LOOK FOR: HIS HIPS SHOULD NOT ROCK SIDE TO SIDE. This is the whole point of the exercise. If his hips sway like a pendulum every time he lifts a hand, say \"Widen your feet for more balance\" and \"Pretend someone is watching from above, your hips should stay totally still.\" If it's still too hard, just hold a push-up position for 20 sec.", 3, "strength"),
  ];

  const p2Cooldown = [
    ex("Shoulder Stretch", "Cross-body pull 20 sec each arm. Same as Phase 1.", "LOOK FOR: By now this should be routine. If his range of motion has improved (he can pull the arm further), that's a win. Mention it to him. Progress isn't always visible in the mirror.", 1, "cooldown"),
    ex("Sleeper Stretch", "20 sec, throwing arm only. Same gentle press as Phase 1.", "SAME RULES AS PHASE 1: Gentle. If he ever says the back of his shoulder is sore after pitching days, spend extra time here (30 sec) and lighten the next pitching session. Shoulder tightness in a 9-year-old pitcher is a yellow flag. It means his arm needs more recovery.", 1, "cooldown"),
    ex("Quad Stretch", "Standing, grab one foot behind him, pull heel toward glute. 20 sec each leg. Use wall for balance.", "LOOK FOR: His knees should stay close together (not splaying out). If he can't reach his foot, use a towel looped around the ankle. He should feel this in the front of his thigh. If he arches his back, say \"Tuck your hips under.\"", 1, "cooldown"),
    ex("Deep Breathing", "5 slow breaths. Inhale through the nose (4 seconds), exhale through the mouth (6 seconds). Longer exhale than inhale.", "WHY THIS MATTERS: This isn't filler. It activates the parasympathetic nervous system and starts recovery. It also teaches him to calm down between innings. Sit or stand still, eyes closed. If he rushes it, count for him out loud: \"In, 2, 3, 4... out, 2, 3, 4, 5, 6.\"", 1, "cooldown"),
  ];

  const p2PitchDay = (strengthSet) => [
    ...p2Warmup,
    ex("Long Toss", "8-10 throws. Start at 40 feet, take 2-3 steps back after every 2 throws until you're at 60 feet. Throw on a line or slight arc. Easy effort that gradually builds.", "COACHING GUIDE: Long toss builds arm strength safely because he's throwing at low effort over distance. WHAT GOOD LOOKS LIKE: Ball should travel on a line or gentle arc, not a rainbow. If every throw is a high arc, say \"Try to throw through your partner's chest, not over their head.\" If his arm drops to sidearm at longer distances, say \"Stay on top, reach up and throw over the top.\" Arm slot should stay consistent at every distance. If he starts grabbing his shoulder or elbow, STOP IMMEDIATELY and go to cooldown. Soreness here means his arm isn't ready for this distance yet.", 5, "pitching"),
    ex("Mound Work: Full Distance", "30 throws from 46 feet (regulation 9-10 year old distance). Work fastball to four spots: up-and-in, up-and-away, down-and-in, down-and-away. Alternate spots every 5-7 pitches.", "COACHING GUIDE: Now you're coaching from behind or beside the mound. WHAT GOOD LOOKS LIKE: Everything from Phase 1 accuracy work but at full distance. His stride should be long and aggressive (front foot should land roughly 80% of his height away from the rubber). KEY THING TO WATCH: where his front foot lands. It should land on a straight line toward the target, slightly closed (toe pointed just left of target for a righty). If his foot lands toward first base (\"opening up\"), every pitch will sail arm-side. Say \"Point your front toe at the catcher's left knee.\" FOR MISSES: High = releasing too early (\"reach out further toward the catcher before you let go\"). Low = arm is dragging or he's landing too stiff (\"bend your front knee a little at landing, stay loose\"). Arm-side miss = front shoulder flying open (\"lead with your hip, keep your glove shoulder closed longer\"). Glove-side miss = he's not rotating enough (\"finish your throw, your chest should face the catcher at the end\").", 15, "pitching"),
    ex("Pitch Sequencing", "10 throws. Before EACH pitch, he calls the location out loud (\"fastball, down and away\"). Then he has to hit it. No do-overs, just the next pitch.", "COACHING GUIDE: This trains intentionality. Most young pitchers just \"throw hard to the middle.\" By calling his spot, he's building the mental habit of pitching with a plan. TRACK RESULTS: How many of the 10 did he hit within a ball's width of his target? Write it down. Week over week, this number should climb. If he's hitting 3/10, that's normal early on. If he's frustrated, say \"Pros hit their spot about 5 or 6 out of 10. You're training your brain and arm to work together.\" DON'T CORRECT MECHANICS HERE. This is a performance drill. Save mechanical fixes for the mound work block.", 5, "pitching"),
    ...strengthSet,
    ...p2Cooldown,
  ];

  const p2HitDay = (strengthSet) => [
    ...p2Warmup,
    ex("Soft Toss / Tee: Drive Drill", "15 swings. If doing tee work, place the tee on the front third of the plate (out in front of him). If doing soft toss, toss from the side and slightly in front. The goal: drive THROUGH the ball with full extension after contact.", "COACHING GUIDE: After the bat makes contact, watch his arms. WHAT GOOD LOOKS LIKE: Both arms extend fully toward the pitcher (like he's reaching the bat toward the mound). WHAT BAD LOOKS LIKE: His arms fold in and the bat wraps around his body immediately after contact. If the bat wraps early, say \"Extend through it. Pretend you're pushing the ball with your bat toward center field after you hit it.\" Another cue: \"Hit through three balls.\" Imagine three balls lined up. He needs to swing through all three, not just the first one. This is what generates power: bat speed THROUGH the contact zone, not just TO the contact zone.", 7, "hitting"),
    ex("Cage Reps: Medium Speed", "20 swings at a faster machine speed than Phase 1. The ball should challenge his timing slightly but not overwhelm him. He should be making contact on at least 15 out of 20.", "COACHING GUIDE: Increase speed only when he was consistently barreling at the slower speed. TIMING IS EVERYTHING NOW. LOOK FOR: where he's making contact relative to his body. Good contact happens when the ball meets the bat over the front half of the plate (out in front of his front hip). If he's hitting everything off his back hip, he's late. Say \"See it and go. Start your swing earlier.\" If he's way out front and pulling everything foul, say \"Let it travel, be patient. Wait until you can see the ball clearly.\" WATCH HIS HEAD: it should stay still and facing the pitch from start to finish. If his head is jerking or pulling off, say \"Quiet head, watch the ball hit the bat.\" This is one of the hardest habits to build and one of the most important.", 10, "hitting"),
    ex("Zone Hitting", "10 swings. Before the pitch, call 'inside' or 'outside.' On an inside call, he tries to pull the ball (turn on it early). On an outside call, he tries to go the other way (stay back, hit to opposite field).", "COACHING GUIDE: This teaches plate coverage and adjustability. INSIDE APPROACH: His hips fire faster, hands stay tight, bat head gets out front early. The ball should go to the pull side. If he's hitting inside pitches the other way, he's late. Say \"Faster hips, get the barrel out front.\" OUTSIDE APPROACH: He stays back longer, lets the ball travel deeper, and pushes it the other direction. Hands lead the barrel through the zone. If he's pulling outside pitches, he's committing too early. Say \"Wait on it, let it get deep, push your hands toward the ball.\" Don't worry if this is hard. It's supposed to be. Even getting 3-4 out of 10 \"correct\" is progress for a 9-year-old.", 5, "hitting"),
    ex("Power Swings", "5 swings off the tee. MAXIMUM EFFORT with good mechanics. He should be swinging as hard as he can while keeping his form. This is the fun part.", "COACHING GUIDE: Let him rip. The only two things to watch: (1) Does he stay balanced? If he's falling over after the swing, his weight is getting out in front. Say \"Strong front leg, don't lunge.\" His front leg should firm up and act like a post his body rotates around. (2) Does his head stay still? If his head flies off the ball, even a hard swing won't connect in games. Give him a target: try to hit the ball at a spot on the net. This channels the aggression into something useful instead of just swinging wild.", 3, "hitting"),
    ...strengthSet,
    ...p2Cooldown,
  ];

  for (let w = 4; w <= 7; w++) {
    weeks.push({
      week: w, phase: "Build", phaseNum: 2,
      objective: w === 4 ? "Introduce light dumbbells and med ball work. Extend pitching to full distance." : w === 5 ? "Build consistency at 46 ft. Increase cage speed. Strength reps climbing." : w === 6 ? "Pitch sequencing becomes intentional. Rotational power developing." : "Peak training volume. Arm should feel strong. Hitting with more authority.",
      days: [
        { day: "Day 1", label: "Pitch + Push/Rotation", exercises: p2PitchDay(p2StrengthA) },
        { day: "Day 2", label: "Hit + Pull/Carry", exercises: p2HitDay(p2StrengthB) },
        { day: "Day 3", label: "Pitch + Pull/Carry", exercises: p2PitchDay(p2StrengthB) },
        { day: "Day 4", label: "Hit + Push/Rotation", exercises: p2HitDay(p2StrengthA) },
      ],
    });
  }

  // ======== PHASE 3: PERFORM (Weeks 8-10) ========
  const p3Warmup = [
    ex("Dynamic Warm-Up", "Jog 1 lap, 10 high knees, 10 butt kicks, karaoke shuffle both directions (20 feet each), arm circles.", "LOOK FOR: By now this should take 3 minutes and feel automatic. He should be moving with energy. If he's dragging, this is your sign he may need a lighter session today. The warm-up is a daily readiness check.", 3, "warmup"),
    ex("Band Arm Care", "Pull-aparts 15 reps, external rotations 10 each arm, internal rotations 10 each arm. Non-negotiable.", "LOOK FOR: Same cues as Phase 2. These never get skipped, even on hitting days. If you're ever short on time, cut something else. This stays. His shoulder health at age 9 is worth more than any single drill.", 2, "warmup"),
    ex("Med Ball Slams", "8 reps. Hold 2-4 lb medicine ball overhead with both hands. Rise up on toes, then slam it into the floor as hard as possible. Catch the bounce, repeat.", "LOOK FOR: Full extension overhead before the slam (arms straight, up on toes). The slam comes from his whole body, not just arms. He should hinge at the hips and throw his chest toward the ground. If he's barely bouncing the ball, say \"Get angry, throw it through the floor.\" This wakes up the nervous system and gets him ready to perform. It's also just fun.", 2, "warmup"),
    ex("Hip Openers", "Spiderman lunge with reach: step into a deep lunge, place the hand (same side as front foot) on the floor inside the foot, then reach the other hand to the ceiling and rotate. 5 each side.", "LOOK FOR: His back knee can hover or rest on the ground. The rotation should come from his mid-back (thoracic spine), not his lower back. If he can't reach the ground, let him put his hand on his front knee instead. This opens everything needed for pitching and hitting: hips, groin, mid-back rotation.", 1, "warmup"),
  ];

  const p3StrengthA = [
    ex("Push-Ups", "3 sets of 10. Slow negative: take 3 full seconds to lower, then push up fast. Full range of motion.", "LOOK FOR: The slow lowering is the point. If he's dropping fast and pushing up slow, he has it backwards. Count out loud for him: \"Dooown, 2, 3... UP!\" Three sets is new. If he gasses out on set 3, let him drop to knees to finish. Write down how many full push-ups he got before going to knees. That's his benchmark to beat.", 4, "strength"),
    ex("Goblet Squat", "3 sets of 10 with a 10 lb dumbbell. Same form: chest up, heels down, knees out, elbows inside knees at the bottom.", "LOOK FOR: At this weight, he might start leaning forward at the bottom. If his chest drops, he's compensating for core weakness, not leg weakness. Say \"Drive your elbows into your knees at the bottom and push your chest up.\" If 10 lbs is easy with perfect form across all 3 sets, he's ready for 12-15 next week.", 4, "strength"),
    ex("Med Ball Rotation Throw", "3 sets of 6 each side. Use a 4-6 lb ball if the 2-4 lb was easy. MAXIMUM INTENT on every throw. This is a power exercise, not a fatigue exercise.", "COACHING GUIDE: By now his hip rotation should be leading the throw. The progression cue for Phase 3: SEPARATION. His hips should start turning while his upper body is still loaded back. Watch his belly button versus his chest. Belly button faces the wall while chest still faces sideways = separation = power. If his whole body turns as one block, say \"Your hips are the door. Open the door with your hips, but keep your hands behind you for a split second.\" This is the exact same mechanic as a pitching motion and a batting swing. If he masters this, BOTH get better.", 4, "strength"),
    ex("Plank Hold", "2 sets of 30 seconds. Squeeze glutes and abs hard. Perfect position.", "LOOK FOR: 30 seconds should be manageable if his form is right. If he's shaking, that's fine and actually means it's working. If he collapses before 30, shorten to where he can hold with perfect form and build from there. The shake is the muscles being challenged at their limit. Say \"The shaking means you're getting stronger right now.\"", 2, "strength"),
  ];

  const p3StrengthB = [
    ex("Dumbbell Rows", "3 sets of 10 each arm with 8-10 lb. Pull to hip, squeeze at top for a one-count pause, lower slowly.", "LOOK FOR: The one-count pause at the top is new. He should be able to hold the dumbbell at his hip for a full second without his form breaking. If he can't pause (the weight pulls his hand straight back down), it's too heavy. The pause eliminates momentum and makes the muscle do all the work. Say \"Pull, squeeze, hold it... lower it slow.\"", 4, "strength"),
    ex("Split Squats", "2 sets of 8 each leg. One foot forward, one foot behind (back toe on the ground). Lower straight down until back knee almost touches the floor. Push back up. If able, elevate the back foot on a low bench.", "COACHING GUIDE: This is harder than lunges because one leg does all the work. WATCH HIS FRONT KNEE: it must stay over his ankle, not caving in or shooting forward. If he wobbles, let him hold a wall. If the back-foot-elevated version is too hard, keep both feet on the ground. NEW CUE: \"Straight down, not forward.\" His body should drop straight like an elevator, not drift forward like he's lunging. This builds the single-leg strength for his pitching drive leg.", 4, "strength"),
    ex("Farmer's Carries", "3 sets of 40 feet. 10-15 lb each hand. Walk tall, squeeze the handles.", "LOOK FOR: Same as Phase 2 but heavier and an extra set. If 15 lb is making him lean, stay at 10. His grip might fail before his posture does, and that's OK. Grip strength matters for bat control. If he has to set them down mid-carry, note that. Goal is to complete 40 feet without stopping. When he can, it's time to go up in weight.", 3, "strength"),
    ex("Dead Bugs", "2 sets of 12 each side. Add a 2-second pause at full extension if he's ready.", "LOOK FOR: By Week 8 this should look smooth and controlled. If the pause version is clean, he's built real core strength this summer. If his back still arches with the pause, stay with the no-pause version. Consistent quality trumps advancement every time.", 3, "strength"),
  ];

  const p3Cooldown = [
    ex("Full Shoulder Stretch Routine", "Cross-body stretch, sleeper stretch, and doorway stretch (stand in a doorframe, forearm on the frame, lean forward gently). 20 sec each position, both arms.", "LOOK FOR: The doorway stretch is new. His elbow should be at shoulder height on the doorframe, and he leans forward until he feels a stretch across his chest and the front of his shoulder. If he puts his elbow too high (above shoulder), it can pinch. Keep it at shoulder level. This opens up the chest muscles that tighten from push-ups and throwing.", 2, "cooldown"),
    ex("Hip & Hamstring Stretch", "Seated on the floor, legs in a wide V. Reach forward toward the center. Hold 30 seconds. Then reach toward each foot for 15 seconds.", "LOOK FOR: He doesn't need to touch his toes. Just reach until he feels a stretch in his inner thighs and hamstrings. If he's bouncing, say \"No bouncing, just hold and breathe into the stretch.\" Encourage him to relax into it. Flexibility gains come from relaxation, not forcing.", 1, "cooldown"),
    ex("Deep Breathing", "5 slow breaths. Same cadence: 4 seconds in, 6 seconds out. Ask him: \"What went well today? What do you want to work on next time?\"", "WHY THE QUESTIONS: This builds a reflective habit. He starts to coach himself. You're not looking for detailed answers. Even \"my pitching felt good\" or \"I kept missing left\" is enough. It makes the session stick in his memory and gives you both a thread to pick up next time.", 1, "cooldown"),
  ];

  const p3PitchDay = (strengthSet) => [
    ...p3Warmup,
    ex("Long Toss", "8 throws building to 70 feet if his arm feels good. Same rules: line drives, not rainbows. If 60 feet is the comfortable max, stay there.", "COACHING GUIDE: Never push distance if his arm isn't feeling right. Ask him before starting: \"How does your arm feel today, 1 to 10?\" Anything below a 7 and you stay at 50-60 feet max. 70 feet is the goal by the end of summer, not a requirement. LOOK FOR: Does his arm slot stay the same as the distance increases? If he drops to sidearm at longer distances, he's compensating. Say \"Stay on top, even if it doesn't go as far.\" Proper mechanics at shorter distance beats bad mechanics at longer distance every single time.", 4, "pitching"),
    ex("Game Simulation", "30-35 pitches from the mound. You call situations before each pitch: \"Runner on second, 1-1 count\" or \"Nobody on, first pitch to a new batter\" or \"Full count, two outs.\" He calls his pitch and location, then executes.", "COACHING GUIDE: THIS IS THE DRILL WHERE ALL THE SUMMER'S WORK COMES TOGETHER. Your job is to create pressure and make him think. Here's how to run it: (1) Call a situation. (2) Ask him \"What are you throwing and where?\" (3) He has to commit BEFORE he throws. (4) Evaluate the result together. WHAT HE SHOULD BE THINKING: First pitch to a new batter? Throw a strike. Get ahead. Fastball, middle-in or middle-away. Runner on second, less than 2 outs? Keep the ball down. Ground ball gets the out. Full count? His best pitch to his best spot. No nibbling the corners. IF HE'S CONSISTENTLY MISSING: Don't try to fix mechanics mid-drill. Instead, simplify. Say \"Forget the situation. Just throw your fastball to the glove. One pitch at a time.\" Then rebuild from there. If the same mechanical issue keeps popping up (arm slot, front side flying open, landing foot offline), note it and make it the focus of the NEXT session's mound work. Don't overload him during simulation. PITCH COUNT: Stick to 30-35. If he's at 30 and looking tired (arm slowing down, missing badly, body language dragging), stop early. Strong finish beats grinding through fatigue.", 16, "pitching"),
    ex("Pressure Pitches", "5 throws. The scenario: full count, bases loaded, championship game. He picks his pitch and location. Must commit fully. These are his 5 best pitches of the day.", "COACHING GUIDE: Build this up. Make it dramatic. Say \"Bases loaded, full count, your team is up by one in the last inning.\" Then step back and let him work. LOOK FOR: Does he commit or tentatively push the ball? Under pressure, kids tend to aim instead of throw. Aiming makes the arm decelerate. If you see him guiding the ball, say \"Trust your arm. You've thrown a thousand pitches this summer. Let it go.\" After each pitch, give a quick call: \"Strike, batter's done!\" or \"Ball, walked in a run, shake it off, next batter.\" Make it feel like something. This is as close to game adrenaline as practice gets. The goal isn't perfection. It's learning to compete when it matters.", 4, "pitching"),
    ...strengthSet,
    ...p3Cooldown,
  ];

  const p3HitDay = (strengthSet) => [
    ...p3Warmup,
    ex("Cage Reps: Game Speed", "15 swings at the fastest machine speed where he can still make solid contact on at least 10 of 15. If he's whiffing more than 5, slow it down one notch.", "COACHING GUIDE: This is about testing his improved timing under pressure. LOOK FOR: (1) His hands should start moving BEFORE the ball arrives, not reacting after he sees it. Good hitters start the swing early and adjust. Late starters are always behind. If he's late on everything, say \"Start your hands earlier. Your hands should be moving before you're sure where the ball is.\" (2) Watch his front foot: it should be planted and firm at contact. If he's still stepping when the ball arrives, he's late. Say \"Get your foot down early. Step, then swing.\" (3) Head position: his head should be still and tracking the ball into the contact zone. If he's pulling off (jerking his head toward where the ball went), say \"Watch the ball hit the bat. Don't look where you're hitting it, see the contact happen.\"", 8, "hitting"),
    ex("Reaction Drill", "10 swings. You stand behind the cage and yell 'INSIDE' or 'OUTSIDE' just as the ball is released from the machine (or just before). He has to adjust his swing on the fly.", "COACHING GUIDE: This is deliberately hard and deliberately game-like. He won't get all 10 right. INSIDE APPROACH: He should turn on the ball, get the barrel out front, pull it. Faster hip rotation, hands tight. OUTSIDE APPROACH: He stays back, lets the ball get deeper, pushes it the other way. Hands lead the barrel. THE ADJUSTMENT IS IN THE HIPS AND TIMING, NOT THE HANDS. If he's just reaching his arms, say \"Your hips decide where the ball goes, not your hands. Inside? Fast hips. Outside? Wait and push.\" SCORING: Inside pitch pulled = 2 points. Outside pitch hit the other way = 2 points. Good contact wrong direction = 1 point. Whiff = 0. Anything over 10 points out of 20 possible is really good.", 6, "hitting"),
    ex("Tee Power Rounds", "8 swings off the tee. Maximum intent. Set the tee slightly in front of the plate so he's making contact out front. Full swing, full extension, full follow-through.", "COACHING GUIDE: These should be his hardest swings of the day. WHAT TO LOOK FOR: (1) His back foot should pivot (like squishing a bug) and his back hip should fully rotate through. If his back foot stays flat, he's not using his lower half. Say \"Squish the bug, drive your back hip through.\" (2) After contact, both arms extend fully and the bat finishes high over his lead shoulder. If the bat dies at contact, say \"Finish the swing. Finish high.\" (3) SOUND: listen for the loudest contact of the session. If the tee swings sound louder and cleaner than his cage swings, his timing in the cage needs work. It means his mechanics are good but his pitch recognition is lagging.", 4, "hitting"),
    ex("Fun Round", "10 swings, his choice. He picks the speed, he picks if he wants tee or machine, he picks the challenge. Let him compete with himself or just enjoy hitting.", "COACHING GUIDE: DO NOT COACH THIS ROUND. Seriously. Zip it. Let him have fun. If he asks for feedback, give it. Otherwise, just watch and enjoy watching your kid hit baseballs. The purpose is to end every session on a high note so he wants to come back. If he naturally gravitates toward his weakest area, that tells you he's internally motivated to improve. If he gravitates toward what he's best at, that's fine too. Confidence matters.", 4, "hitting"),
    ...strengthSet,
    ...p3Cooldown,
  ];

  for (let w = 8; w <= 10; w++) {
    weeks.push({
      week: w, phase: "Perform", phaseNum: 3,
      objective: w === 8 ? "Game simulation begins. Translate training into competitive reps." : w === 9 ? "Peak confidence week. Everything clicking: arm, bat, body." : "Finish strong. Light final 2 sessions. Walk away hungry for fall ball.",
      days: [
        { day: "Day 1", label: "Pitch + Push/Rotation", exercises: p3PitchDay(p3StrengthA) },
        { day: "Day 2", label: "Hit + Pull/Carry", exercises: p3HitDay(p3StrengthB) },
        { day: "Day 3", label: "Pitch + Pull/Carry", exercises: p3PitchDay(p3StrengthB) },
        { day: "Day 4", label: "Hit + Push/Rotation", exercises: p3HitDay(p3StrengthA) },
      ],
    });
  }

  return weeks;
}

const CATEGORY_COLORS = {
  warmup: { bg: "#FFF3E0", border: "#FF9800", text: "#E65100", icon: "\u{1F525}" },
  pitching: { bg: "#E3F2FD", border: "#2196F3", text: "#0D47A1", icon: "\u26BE" },
  hitting: { bg: "#F3E5F5", border: "#9C27B0", text: "#4A148C", icon: "\u{1F3CF}" },
  strength: { bg: "#E8F5E9", border: "#4CAF50", text: "#1B5E20", icon: "\u{1F4AA}" },
  cooldown: { bg: "#E0F7FA", border: "#00BCD4", text: "#006064", icon: "\u{1F9CA}" },
};

const PHASE_COLORS = {
  1: { accent: "#FF9800", bg: "#FFF8F0", tag: "#FFF3E0", tagText: "#E65100" },
  2: { accent: "#2196F3", bg: "#F0F7FF", tag: "#E3F2FD", tagText: "#0D47A1" },
  3: { accent: "#4CAF50", bg: "#F0FFF0", tag: "#E8F5E9", tagText: "#1B5E20" },
};

const STORAGE_KEY = "vaughn-summer-2026-v2";

export default function App() {
  const [completed, setCompleted] = useState({});
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [view, setView] = useState("overview");
  const [expandedEx, setExpandedEx] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) setCompleted(JSON.parse(result.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  const saveCompleted = useCallback(async (next) => {
    setCompleted(next);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  }, []);

  const toggle = (wi, di, ei) => {
    const k = `${wi}-${di}-${ei}`;
    const n = { ...completed };
    if (n[k]) delete n[k]; else n[k] = true;
    saveCompleted(n);
  };

  const dayProg = (wi, di) => {
    const d = PLAN[wi].days[di]; let done = 0;
    d.exercises.forEach((_, i) => { if (completed[`${wi}-${di}-${i}`]) done++; });
    return { done, total: d.exercises.length, pct: d.exercises.length > 0 ? Math.round((done / d.exercises.length) * 100) : 0 };
  };

  const weekProg = (wi) => {
    let done = 0, total = 0;
    PLAN[wi].days.forEach((d, di) => { d.exercises.forEach((_, ei) => { total++; if (completed[`${wi}-${di}-${ei}`]) done++; }); });
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const totalProg = () => {
    let done = 0, total = 0;
    PLAN.forEach((w, wi) => { w.days.forEach((d, di) => { d.exercises.forEach((_, ei) => { total++; if (completed[`${wi}-${di}-${ei}`]) done++; }); }); });
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  if (!loaded) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "'DM Sans', sans-serif" }}><p style={{ color: "#666" }}>Loading...</p></div>;

  // ===== DAY VIEW =====
  if (view === "day") {
    const week = PLAN[activeWeek], day = week.days[activeDay], progress = dayProg(activeWeek, activeDay), pc = PHASE_COLORS[week.phaseNum];
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAFA", minHeight: "100vh", paddingBottom: 40 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: pc.accent, padding: "16px 16px 20px", color: "#fff" }}>
          <button onClick={() => setView("week")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontFamily: "inherit", fontWeight: 600, cursor: "pointer", marginBottom: 8 }}>← Week {week.week}</button>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{day.day}: {day.label}</div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Week {week.week} · {week.phase} Phase · ~60 min</div>
          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.25)", borderRadius: 100, height: 8 }}><div style={{ width: `${progress.pct}%`, background: "#fff", height: 8, borderRadius: 100, transition: "width 0.3s" }} /></div>
          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>{progress.done}/{progress.total} complete</div>
        </div>
        <div style={{ padding: "12px 12px" }}>
          {day.exercises.map((ex, i) => {
            const key = `${activeWeek}-${activeDay}-${i}`, done = !!completed[key], cat = CATEGORY_COLORS[ex.category];
            const prevCat = i > 0 ? day.exercises[i - 1].category : null, showLabel = ex.category !== prevCat;
            const isExp = expandedEx === key;
            return (
              <div key={i}>
                {showLabel && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: i > 0 ? 16 : 8, marginBottom: 6, paddingLeft: 4 }}><span style={{ fontSize: 14 }}>{cat.icon}</span><span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: cat.text }}>{ex.category}</span></div>}
                <div style={{ background: done ? "#F5F5F5" : "#fff", border: `1.5px solid ${done ? "#E0E0E0" : cat.border}`, borderRadius: 10, marginBottom: 6, overflow: "hidden", opacity: done ? 0.65 : 1, transition: "all 0.2s" }}>
                  <div onClick={() => toggle(activeWeek, activeDay, i)} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", cursor: "pointer" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, border: `2px solid ${done ? "#4CAF50" : "#CCC"}`, background: done ? "#4CAF50" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>{done && "✓"}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: done ? "#999" : "#222", textDecoration: done ? "line-through" : "none" }}>{ex.name}</div>
                      <div style={{ fontSize: 12, color: done ? "#BBB" : "#666", marginTop: 2, lineHeight: 1.45 }}>{ex.detail}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: cat.text, background: cat.bg, borderRadius: 6, padding: "2px 6px", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>{ex.mins}m</div>
                  </div>
                  {ex.coaching && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setExpandedEx(isExp ? null : key); }} style={{ display: "flex", alignItems: "center", gap: 4, width: "100%", textAlign: "left", background: isExp ? "#FFF8E1" : "#FAFAFA", border: "none", borderTop: `1px solid ${done ? "#E8E8E8" : cat.border}40`, padding: "7px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600, color: isExp ? "#F57F17" : "#888", transition: "all 0.2s" }}>
                        <span style={{ fontSize: 13 }}>{"\u{1F9D1}\u200D\u{1F3EB}"}</span><span>{isExp ? "Hide coaching cues" : "Show coaching cues"}</span><span style={{ marginLeft: "auto", fontSize: 10 }}>{isExp ? "▲" : "▼"}</span>
                      </button>
                      {isExp && (
                        <div style={{ padding: "10px 14px 12px", background: "#FFFDE7", borderTop: "1px solid #FFF9C4", fontSize: 12.5, lineHeight: 1.55, color: "#333" }}>
                          {ex.coaching.split(/(?=LOOK FOR:|COACHING GUIDE:|THE KEY|THE #1|COMMON|WHY|SAME RULES|IF HE'S|WHAT GOOD|WHAT BAD|WHAT HE SHOULD|WHAT TO LOOK|YOUR JOB|DO NOT|SCORING|FOR MISSES|TRACK|NEW CUE|WATCH HIS|INSIDE APPROACH|OUTSIDE APPROACH|THE ADJUSTMENT|NEVER PUSH|PITCH COUNT|SOUND:|TIMING|THE SOUND)/).map((section, si) => {
                            const m = section.match(/^(LOOK FOR:|COACHING GUIDE:|THE KEY[^:]*:|THE #1[^:]*:|COMMON[^:]*:|WHY[^:]*:|SAME RULES[^:]*:|WHAT GOOD[^:]*:|WHAT BAD[^:]*:|WHAT HE SHOULD[^:]*:|WHAT TO LOOK[^:]*:|YOUR JOB[^:]*:|DO NOT[^:]*:|SCORING:|FOR MISSES:|TRACK[^:]*:|NEW CUE[^:]*:|WATCH[^:]*:|INSIDE APPROACH:|OUTSIDE APPROACH:|THE ADJUSTMENT[^:]*:|NEVER PUSH[^:]*:|PITCH COUNT:|SOUND:|TIMING[^:]*:|THE SOUND[^:]*:)/);
                            if (m) return <p key={si} style={{ margin: si > 0 ? "8px 0 0" : "0" }}><strong style={{ color: "#E65100" }}>{m[1]}</strong>{section.slice(m[1].length)}</p>;
                            return <p key={si} style={{ margin: si > 0 ? "8px 0 0" : "0" }}>{section}</p>;
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, padding: "8px 12px", justifyContent: "center" }}>
          {week.days.map((d, di) => {
            const dp = dayProg(activeWeek, di);
            return <button key={di} onClick={() => { setActiveDay(di); setExpandedEx(null); }} style={{ flex: 1, padding: "10px 4px", border: di === activeDay ? `2px solid ${pc.accent}` : "2px solid #E0E0E0", borderRadius: 10, background: di === activeDay ? pc.tag : "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}><div style={{ fontSize: 11, fontWeight: 700, color: di === activeDay ? pc.accent : "#666" }}>D{di + 1}</div><div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{dp.done}/{dp.total}</div></button>;
          })}
        </div>
      </div>
    );
  }

  // ===== WEEK VIEW =====
  if (view === "week") {
    const week = PLAN[activeWeek], wp = weekProg(activeWeek), pc = PHASE_COLORS[week.phaseNum];
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAFA", minHeight: "100vh", paddingBottom: 40 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: pc.accent, padding: "16px 16px 20px", color: "#fff" }}>
          <button onClick={() => setView("overview")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontFamily: "inherit", fontWeight: 600, cursor: "pointer", marginBottom: 8 }}>← All Weeks</button>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Week {week.week}</div>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600, marginTop: 4 }}>{week.phase} Phase</div>
          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.25)", borderRadius: 100, height: 8 }}><div style={{ width: `${wp.pct}%`, background: "#fff", height: 8, borderRadius: 100, transition: "width 0.3s" }} /></div>
          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>{wp.done}/{wp.total} exercises complete</div>
        </div>
        <div style={{ margin: "12px 12px", background: pc.tag, border: `1.5px solid ${pc.accent}30`, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: pc.accent, marginBottom: 4 }}>Weekly Objective</div>
          <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>{week.objective}</div>
        </div>
        <div style={{ padding: "4px 12px" }}>
          {week.days.map((day, di) => {
            const dp = dayProg(activeWeek, di), cats = {};
            day.exercises.forEach(e => { if (!cats[e.category]) cats[e.category] = 0; cats[e.category] += e.mins; });
            return (
              <button key={di} onClick={() => { setActiveDay(di); setExpandedEx(null); setView("day"); }} style={{ display: "block", width: "100%", textAlign: "left", background: dp.pct === 100 ? "#F8FFF8" : "#fff", border: dp.pct === 100 ? "1.5px solid #4CAF50" : "1.5px solid #E0E0E0", borderRadius: 12, padding: "14px 14px", marginBottom: 8, cursor: "pointer", fontFamily: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontSize: 16, fontWeight: 700, color: dp.pct === 100 ? "#4CAF50" : "#222" }}>{dp.pct === 100 && "✓ "}{day.day}</div><div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{day.label}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontWeight: 700, color: pc.accent, fontFamily: "'DM Mono', monospace" }}>{dp.pct}%</div></div>
                </div>
                <div style={{ marginTop: 10, background: "#F0F0F0", borderRadius: 100, height: 6 }}><div style={{ width: `${dp.pct}%`, background: dp.pct === 100 ? "#4CAF50" : pc.accent, height: 6, borderRadius: 100, transition: "width 0.3s" }} /></div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {Object.entries(cats).map(([c, m]) => { const cc = CATEGORY_COLORS[c]; return <span key={c} style={{ fontSize: 10, fontWeight: 600, background: cc.bg, color: cc.text, borderRadius: 4, padding: "2px 6px" }}>{cc.icon} {c} {m}m</span>; })}
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 4, padding: "8px 12px", flexWrap: "wrap", justifyContent: "center" }}>
          {PLAN.map((w, wi) => { const ww = weekProg(wi), wpc = PHASE_COLORS[w.phaseNum]; return <button key={wi} onClick={() => setActiveWeek(wi)} style={{ width: 32, height: 32, borderRadius: 8, border: wi === activeWeek ? `2px solid ${wpc.accent}` : "1.5px solid #DDD", background: ww.pct === 100 ? "#4CAF50" : wi === activeWeek ? wpc.tag : "#fff", color: ww.pct === 100 ? "#fff" : wi === activeWeek ? wpc.accent : "#666", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{wi + 1}</button>; })}
        </div>
      </div>
    );
  }

  // ===== OVERVIEW =====
  const tp = totalProg();
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAFA", minHeight: "100vh", paddingBottom: 40 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ background: "linear-gradient(135deg, #1A237E 0%, #283593 50%, #3949AB 100%)", padding: "24px 16px 28px", color: "#fff" }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7 }}>Summer 2026</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>Vaughn's Training Plan</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>10 weeks · 4 days/week · 60 min sessions</div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 100, height: 10 }}><div style={{ width: `${tp.pct}%`, background: "#FFD54F", height: 10, borderRadius: 100, transition: "width 0.3s" }} /></div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{tp.pct}%</div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{tp.done} of {tp.total} exercises completed</div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "12px 12px 4px", justifyContent: "center" }}>
        {[{ label: "Foundation", p: 1, weeks: "1-3" }, { label: "Build", p: 2, weeks: "4-7" }, { label: "Perform", p: 3, weeks: "8-10" }].map(ph => (
          <div key={ph.p} style={{ background: PHASE_COLORS[ph.p].tag, border: `1.5px solid ${PHASE_COLORS[ph.p].accent}40`, borderRadius: 8, padding: "6px 10px", textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: PHASE_COLORS[ph.p].accent }}>{ph.label}</div>
            <div style={{ fontSize: 10, color: "#999" }}>Wk {ph.weeks}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 12px" }}>
        {PLAN.map((week, wi) => {
          const wp = weekProg(wi), pc = PHASE_COLORS[week.phaseNum];
          return (
            <button key={wi} onClick={() => { setActiveWeek(wi); setView("week"); }} style={{ display: "block", width: "100%", textAlign: "left", background: wp.pct === 100 ? "#F8FFF8" : "#fff", border: wp.pct === 100 ? "1.5px solid #4CAF50" : "1.5px solid #E0E0E0", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", fontFamily: "inherit", borderLeft: `4px solid ${wp.pct === 100 ? "#4CAF50" : pc.accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16, fontWeight: 700, color: wp.pct === 100 ? "#4CAF50" : "#222" }}>{wp.pct === 100 && "✓ "}Week {week.week}</span><span style={{ fontSize: 10, fontWeight: 700, background: pc.tag, color: pc.tagText, borderRadius: 4, padding: "1px 6px", textTransform: "uppercase" }}>{week.phase}</span></div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 3, lineHeight: 1.3, maxWidth: 240 }}>{week.objective}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 22, fontWeight: 700, color: wp.pct === 100 ? "#4CAF50" : pc.accent, fontFamily: "'DM Mono', monospace" }}>{wp.pct}%</div><div style={{ fontSize: 10, color: "#999" }}>{wp.done}/{wp.total}</div></div>
              </div>
              <div style={{ marginTop: 8, background: "#F0F0F0", borderRadius: 100, height: 5 }}><div style={{ width: `${wp.pct}%`, background: wp.pct === 100 ? "#4CAF50" : pc.accent, height: 5, borderRadius: 100, transition: "width 0.3s" }} /></div>
            </button>
          );
        })}
      </div>
      <div style={{ margin: "8px 12px 0", background: "#FFF3E0", border: "1.5px solid #FFB74D", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#E65100" }}>⚠️ Arm Safety Reminder</div>
        <div style={{ fontSize: 11, color: "#BF360C", marginTop: 4, lineHeight: 1.4 }}>Pitching days are always Day 1 & Day 3 with a rest day between. If his arm is sore, skip pitching and hit the cage instead. Never push through arm pain.</div>
      </div>
    </div>
  );
}
