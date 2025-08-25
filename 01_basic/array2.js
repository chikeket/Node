fetch("http://192.168.0.83/HelloJSP/replyList.do?bno=145")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    result
      .filter((elem, idx, ary) => {
        //console.log(elem);
        // if (elem.replyer == "user03") {
        //   console.log(elem);
        //   return true;
        // }
        if (elem.reply.indexOf("연습") != -1) {
          console.log(`댓글번호는${ary[idx].replyNo}`);
          return true;
        }
      })
      .forEach((elem) => {
        console.log(`댓글번호는${elem.replyNo}`);
      });
  })
  .catch(console.log("err"));
