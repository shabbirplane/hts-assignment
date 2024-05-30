import HTSAssignment from "./app";
import http from "http";

async function main() {
  const application = new HTSAssignment();

  application
    .start()
    .then((server: http.Server) => {
      console.info("Application is Started.");
    })
    .catch((err: Error) => {
      console.error(err);
    });
}
main();
