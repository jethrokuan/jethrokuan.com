---
layout: post
title: "cli = \u2665"
---

It's amazing how much you can get done with the command line. I manage my music, sync my email, manage my agenda/todos (somewhat) in the command line. Disregarding how cool it might look to your friends, it provides unparalleled functionality and flexibility. Let's get started.

## Music

### beets
I use [beets](http://beets.io/) to manage my music. Among other things, it does these well:

1. Fix metadata by matching the acoustic footprint of each song against the MusicBrainz database
2. Fetch album art and lyrics, adding them to the songs' metadata
3. Search for missing tracks in albums
4. Manage the folder structure for your audio files

Because I listen to random songs from everywhere, I import my songs as songs (rather than albums) with the `-s` flag. This copies the audio file into the appropriate location:

```bash
beet import -s ~/Downloads
```

This is the resultant folder structure:

{% image /assets/images/music.png 600 400 %}

Notice how it replaces illegal characters in the file system (`AC/DC => AC_DC`). This may seem minor, but it'll save you a lot of time when backing up your files and realizing you have incompatible file/folder names. With beet I can guarantee that my music library is always neat and organized. Should you delete or edit some files, simply run `beet up` to update your local library.

[BitTorrent Sync](https://www.getsync.com/) pushes all the relevant changes to my phone, so my phone will always have the updated music library.

### ncmpcpp

[ncmpcpp](http://rybczak.net/ncmpcpp/) is a music player built with `C++`. It is highly configurable, and also has tag editing capabilities. Its killer feature is its incredibly simple song queue.

{% image /assets/images/ncmpcpp.png 600 400 %}
 
I have `ncmpcpp` bound to `Ctrl-Alt-P`, so when I activate the shortcut, it pops up instantly (one of the pros of it being cli-based is that it's super light). Updated your database with `beet` recently? No problem! Just type `u` and the changes are immediately reflected. `p` to pause, `>` to skip song, `~` to add random songs to the play queue. There's also a music browser that lets you add whole albums or individual songs after the current song, or at the end of the playlist.

## Email

If you're using Gmail like me, consider using [offlineimap](https://github.com/OfflineIMAP/offlineimap). The problem with online email is that you have to trust the service providers that they don't lose your email. `offlineimap` does two-way synchronization, so you'll always have your email ready, even without an internet connection.

An additional benefit of having your email offline is that they can be indexed. I use `mu`, a mail indexer that makes searching for emails quick. `mu4e` provides me an interface on Emacs to interact with my email. Outlined [here](http://pragmaticemacs.com/emacs/master-your-inbox-with-mu4e-and-org-mode/), I handle emails in the same way:

> - delete if it is rubbish
> - read and delete if it is not something I’ll need to revisit
> - read and archive if it is something I might need to look up again
> - reply and archive if it is something that will take less than a couple of minutes to reply to and I have the time
> - add to to-do list and archive if it is something that requires an action or just needs a longer reply than I have time to write

The gif below demonstrates my workflow:

{% image /assets/images/workflow.gif 600 400 %}

Nifty! Having everything in one place really helps with organization. Although not exactly command line, it does interact with the command line for it to work.
