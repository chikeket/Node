async function getPost() {
  let response = await fetch("http://localhost:3000/posts");
  let data = await response.json();
  console.log(data);
  data.forEach(async (post) => {
    let response = await fetch("http://localhost:3000/comments");
    let data = await response.json();
    console.log("post번호" + post.id + "에 대한 comments list");
    data.forEach((comment) => {
      if (comment.postId == post.id) {
        console.log("  내용:" + comment.body);
      }
    });
  });
}
getPost();
// fetch("http://localhost:3000/posts", {
// method: "post",
// body: JSON.stringify({
//   id: "4",
//   body: "second comment for postid: 2",
//   postId: 2,
// }),
// headers: { "Content-Type": "application/json;charset=utf-8" },
// }) //기본 요청방식 get방식
// .then((response) => response.json())
// .then((data) => {
//   console.log(data);
//   data.forEach((post) => {
//     // post에 대한 comments 조회.
//     fetch("http://localhost:3000/comments")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("post번호" + post.id + "에 대한 comments list");
//         data.forEach((comment) => {
//           if (comment.postId == post.id) {
//             console.log("내용:" + comment.body);
//           }
//         });
//         // console.log(data);
//       })
//       .catch(console.log);
//end of comments fetch.
//   });
// })
// .catch(console.log);
