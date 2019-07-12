import { handler } from "../src/handlers/App"
import { mockEvent, HTTPMethod } from "./modules/http-event-mocks";

describe("Example tests", () => {
    it("lambda handler should return 200 status code", async () => {
        
        expect.assertions(2) // needs to be set for async tests
        
        const fakeEvent = mockEvent(HTTPMethod.GET, "/", "", {})
        const response = await handler(fakeEvent, null!)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe("success!")
    })
})