export async function sendMail() {
  console.log("sending mail to...");
  return new Promise((res, _) => {
    setTimeout(() => {
      res(1);
    }, 3000);
  });
}
