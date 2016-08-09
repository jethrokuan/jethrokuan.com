---
layout: post
title: "Organizing Your Emacs Config with Special Characters"
---

If you're as crazy as me, and also use emacs (the two may or may not be related), you'll find yourself going to insane lengths while configuring your `.emacs.d`. As your configuration grows, the file gets larger and more difficult to manage, and the urge to start from ground zero kicks in.

One solution is to organize your configuration in different files, which I call layers. One layer for `web`, one for `clojure`, one for `helm` etc. This may be a good solution, but I liked everything in one file, which made it easier for me to manage and byte-compile.

There are special characters in Emacs that let you make clean distinctions between sections of your code, while leaving them in the same file intact.

The form feed character, commonly seen in other programming languages as `\f`, is created in Emacs with the command `C-q C-l`. It is often used as a page break symbol, and is used extensively in emacs lisp to mark different sections of code. It appears as an innocent `^L`, but comes in really handy, because Emacs has special commands to move up/down by pages annotated by this character.

Use `C-x [` and `C-x ]` to move back and forth pages. You can even focus on a single page by narrowing down to it with `C-x n p` and widen to view the whole document again with `C-x n w`.

A simpler way to move about pages is to use `i-search` and search for the form feed character: `C-s C-q C-l`.

You can see how I use it in my emacs config [here](https://github.com/jethrokuan/.emacs.d ).

PS. Another tip is to use [use-package](https://github.com/jwiegley/use-package ), a macro that aids in code-load deferral as well as isolate package configuration.


