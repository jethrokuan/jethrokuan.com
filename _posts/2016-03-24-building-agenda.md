---
layout: post
title: "Building Aagenda"
---

Today, [Aagenda] has, at long last, been released. It's essentially a supercharged list/todo app on Slack. While it has not been fiendishly difficult, several tasks remain insurmountable, and compromises were made.

## Designing Aagenda
Aagenda is not my first Clojure project. Not-so-coincidentally, it is the successor of _ttagenda_, an application of identical purpose but reduced functionality. 

A lot of effort went into designing Aagenda. While largely characteristic of the usual TodoMVC app, a strict limitation to textual commands is imposed, and it proved to be a nerve-wrecking one.

Feature support is extremely difficult when text is the only mode of interaction. There is a desire to act on a list item based on its display id, and a need to act based on its actual id. Then comes the issue of scoping: who should be able to perform what actions.

Providing granular control comes at the cost of usability. After all, the goal of Aagenda is to provide convenience. It should Just Work &trade;, zero configuration required.

Several feature compromises have been made, but it is safe to say the system is sufficiently complex as it stands.

## Building Aagenda
I've been biased towards using Clojure from the start, but here I try to justify my choice.

Not all languages are created equal: some are better for the task at hand. It's important to determine the demands of Aagenda, before evaluating the suitability of a language.

I remember spending a day or two working out what the ideal database structure would be. The need for quick deletion in the middle of the list seemed to point toward a linked list, but this would also make accessing an individual item \\( O(n) \\). The user-to-list-item relationship was also unclear (should the focus be on the user, or on the list item?), and at one point, I tried [Cayley], a graph database. 

Aagenda does not explore new ground, but its specifications are unstable and subject to change. It's easy to see that a certain degree of malleability is demanded.

Clojure provided all the malleability I needed. I split my system into `components`, the 2 main ones being  the web server, and the database connection pool. Don't want to use Postgresql? Switching out is a few lines of code.

Clojure also provided me with tools to build a DSL around my problem domain. By building a language directly targeted at my problem domain, the code length was greatly reduced, and implementing new features became a breeze. If I wanted to support a new command, for example `/aa assign`, all I had to do was to create one function. The reduced code length also results in fewer bugs.

## Releasing Aagenda
I am of the opinion that no software product is truely finished. There are always bugs to be fixed, features to be implemented or reimplemented. There is a strong desire to withhold the release until perfection.

Aagenda was built on the company's vision of how it should work, but it would greatly benefit from user feedback. A user base would help source out more bugs, and give shape to the product.

## Conclusions
Aagenda was initially a rather fun exercise. Clojure is still rather new to me, and it posed as great practice. As the month passed, I grew increasingly tired of it. My addiction to novelty cannot be cured.

My interest in working on something can not be sustained unless I truly have passion for it. I can only hope that it comes sooner rather than later.

On to the next project!

[Aagenda]:http://aagenda.tinkertanker.com/
[Cayley]:https://github.com/google/cayley
