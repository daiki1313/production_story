
#記事
User.all.each do |user|
  Post.create!(
   user_id: user.id,
   title: "title",
   use_tool: "use_tool",
   content: "content",
   category: "original")
 end