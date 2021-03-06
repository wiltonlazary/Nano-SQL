import { nSQL } from "../src/index";
import { expect, assert } from "chai";
import "mocha";
import {
    usersDatabase,
    spaceShipsDatabase
} from "./example-data";


describe("Data Integrity", () => {
    it("Columns should be force type casted", (done: MochaDone) => {
        nSQL("ships").query("upsert", {
            pilotId: "20",
            name: 44,
            meta: "not an object",
            partIds: ["string", "value"],
            year: "2008"
        }).exec().then((rows) => {
            return nSQL("ships").query("select").where(["id", "=", 10]).exec()
        }).then((rows) => {
            try {
                expect(rows).to.deep.equal([ 
                    {
                        pilotId: 20,
                        name: "44",
                        meta: {},
                        partIds: [0, 0],
                        year: 2008,
                        id: 10
                    }], "Runtime type casting failed!");
                done();
            } catch(e) {
                done(e);
            }
        });
    });
});