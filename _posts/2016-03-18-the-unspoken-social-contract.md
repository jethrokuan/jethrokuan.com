---
layout: post
title: The Unspoken Social Contract
---

I haven't been writing a lot recently, for I have instead been climbing volcanoes, and flying off motorbicyles. I've also had the pleasure of giving a talk at Paypal to a group of local developers, and joined the team at [Fisherman].

Open-source work takes a huge slice of my free time. When people depend on the software you make, there is a form of social obligation to be on support 24/7. This involves resolving bug fixes on my phone, and having Hangouts with strangers at 3am in the morning. I have come to understand the burden of the social contract I've unknowingly signed.

Having no formal education in Computer Science, it's likely that the code I write and publish is sub-par. Yet, every single line of code I've written has been made available for the world to see and copy, contributing to the demise of the quality of code in the wild.

Take [fisher-checker] for example. It's my first Go program, and it's already deployed in production. People depend on it to function flawlessly. I'm still largely unaware of the intricacies and antiques of the language; I could well be using certain data types wrongly, or not have written idiomatic code, the latter I'm fairly certain to be guilty of. In addition, no tests have been written, and I have not seeked second opinions on what could be changed or improved. This way, I am knowingly partaking in behaviour that lead to bad code.

If you're self taught like I am, studying publicly-available codebases is the best way to master the craft. Codebases like [Redis] teach you a lot about how to architect and build a program. I shamefully apologise to those using my piece of Go code as reference.

I think I've done a better job with [fish-z]. I've written a comprehensive test suite that covers most use-cases. This can be attributed to the greater need for one; the plugin has a larger user base. I've also received a generous amount of help from [Jorge Bucaran], the author of [Fisherman] himself. Despite garnering much animosity in the `fish` community, I believe he genuinely means good for it, and am grateful for his mentorship.

Without dwelving into the technical details, it suffices to say that I occasionally find myself making irresponsible changes to the codebase, with little consideration of the effect it has on my users. This stems from my work being thus far being solo projects, but these are mere excuses. You may think that it's alright because it's _my_ codebase. It's not. Nothing you put online for free is ever 100% yours. 

In sum, I've learnt that regardless of content type, one has to assume the social responsibility of upholding integrity, accuracy and quality. The World Wide Web is like our ocean, and it's already littered with trash. While cleaning up the ocean may be a herculean task, it all starts from the individual. It starts from you and I.

[Fisherman]:http://fisherman.sh
[fisher-checker]:https://github.com/fisherman/fisher-checker
[fish-z]:https://github.com/fishery/fish-z
[Jorge Bucaran]:https://github.com/bucaran
[Redis]:https://github.com/antirez/redis
