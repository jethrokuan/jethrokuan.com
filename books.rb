require 'rubygems'
require 'nokogiri'

FILE_URL = "books.html"

books_arr = []

Book = Struct.new(:title, :status, :tag)

page = Nokogiri::HTML(File.open(FILE_URL))

page.css('.outline-2 > h2').each do |b| 
  status = b.css('span.todo, span.done').text 
  tag = b.css('span.tag').text
  book = b.css('> text()').text.strip.gsub("\u00A0", "")
  books_arr << Book.new(book, status, tag)
end

body = page.at_css('body')
body.content = ''

books_node = page.create_element "section", :id => "books"

def gen_li(books, status, node, doc)
  books.select{|b| b.status == status}.sort{|b1,b2| b1.title <=> b2.title}.each do |book|
    li = doc.create_element "li"
    li.inner_html = "#{book.title} <span class=\"tag\">#{book.tag}</span>"
    node.add_child(li)
  end
end

to_read_node = page.create_element "section", :id => "TOREAD"
to_read_node.add_child(page.create_element "h2", "To Read", :class => "TO_READ")
to_read_list = page.create_element "ol"
gen_li(books_arr, "TO-READ", to_read_list, page)
to_read_node.add_child(to_read_list)

next_node = page.create_element "section", :id => "NEXT"
next_node.add_child (page.create_element "h2", "Next", :class => "NEXT")
next_node_list = page.create_element "ol"
gen_li(books_arr, "NEXT", next_node_list, page)
next_node.add_child(next_node_list)

reading_node = page.create_element "section", :id => "READING"
reading_node.add_child(page.create_element "h2", "Reading", :class => "READING")
reading_node_list = page.create_element "ol"
gen_li(books_arr, "READING", reading_node_list, page)
reading_node.add_child(reading_node_list)

done_node = page.create_element "section", :id => "DONE"
done_node.add_child(page.create_element "h2", "Done", :class => "DONE")
done_node_list = page.create_element "ol"
gen_li(books_arr, "DONE", done_node_list, page)
done_node.add_child(done_node_list)

books_node.add_child(to_read_node)
books_node.add_child(next_node)
books_node.add_child(reading_node)
books_node.add_child(done_node)

body.add_child(books_node)

File.open(FILE_URL,'w') { |file|
  file.write("---\nlayout: books\n---\n")
  file.write(body.to_xml)
}
