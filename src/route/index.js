import { sendMessage } from "./twilio.route.js";

function routes(app) {
    app.use(sendMessage)
}
export default routes