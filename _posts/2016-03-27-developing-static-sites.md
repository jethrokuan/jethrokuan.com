---
layout: post
title: "Developing Static Sites"
---

```
python -m SimpleHTTPServer
```

Some of you may be familiar with the line above. 

It used to be my go-to server when developing static sites. It starts a web server, serving the files in the current directory.

I'm not a fan of Python, but it's definitely a language that's readily available in most operating systems. Most systems, including OSX, come with some version of Python preinstalled. Grab the `SimpleHTTPServer` Python module, and you're good to go.

However, the Python server created is single-threaded, and can result in timeouts for large images and Javascript files. We can do better.

## The Prerequisites
Let's establish context. We're working on static files. This means our folder would look like this:

```
.
├── [4.0K]  "css"/
├── [4.0K]  "images"/
├── [4.0K]  "js"/
└── [ 668]  "index.html"
```

<span class="newthought">The web server should be lightweight.</span> We don't need any extra cruft, such as injecting `yaml` configurations. This rules out the usual suspects (Jekyll, Hugo etc).

<span class="newthought">The code for the server and the static files must be kept separate.</span> Static files should not contain references to development dependencies in the server. A good litmus test is getting someone to look at the static files. The person should not be able to infer what web server is being used. If I wanted [livereload], the server should inject it programatically, rather than litter the webpage with dependencies that won't be required during production. 

<span class="newthought">The server should be portable.</span> It should work anywhere, and ideally has few or no dependencies. This rules out servers like `http-server`, which depends on Node, and requires `npm` for ease of installation. Even the Python web server depends on the `SimpleHTTPServer` module, and that goes into my bad books.

## Using Go
I've been learning `Go` recently, and thus far I love it. It's fast, easy and cross-platform compatible.

In Go, creating a web server is effortless with just the standard libraries:

{{% code title="serve.go" desc="Basic Go webserver, serving on port 3000" %}}
``` go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Serving files in the current directory on port 3000")
	http.Handle("/", http.FileServer(http.Dir(".")))
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```
{{% /code %}}

I can build the Go code into a binary, and copy it (I named it `serve`) into my project directory. Serving the static files can now be accomplished simply with `./serve`:

```
❯ ./serve
serving /home/jethro/Code/jethrokuan.github.io on port 3000
GET / 200 10ms - 668
GET /css/styles.css 200 3ms - 1.48kb

```

## Going Further
Now, we have a complete replacement for `python -m SimpleHTTPServer` that's both fast, portable, and has no dependencies.

What if you really wanted other features like livereload, or TLS support? Instead of reinventing the wheel, look to [devd].

If you have `Go` installed, you can download `devd` and build it. Alternatively, download the binary [here](https://github.com/cortesi/devd/releases/latest), and put it your `PATH`.

To serve the current directory with livereload enabled, simply type:

``` 
devd -l .
```

Happy hacking!

[livereload]:http://livereload.com/
[devd]:https://github.com/cortesi/devd

