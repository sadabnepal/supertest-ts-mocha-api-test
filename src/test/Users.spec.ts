import { httpPostCall } from '@Helper/apicall';
import { performanceTime } from '@Helper/utils';
import users from "@Resources/testdata.json";
import userschema from "@Schema/user.json";
import { endpoint } from '@Services/endpoints';
import { RESPONSE } from '@Static/Constants';
import { UserPayloadType, UserResponseType } from '@Types/user';
import ResponseAssert from "@Validation/ResponseAssert";

describe('Test ReqRes APIs', () => {

    users.forEach((user: UserPayloadType) => {
        it(`should validate create user ${user.name}`, async function () {
            const startTime = performanceTime()
            const response = await httpPostCall({
                service: endpoint.user,
                payload: user,
                context: this
            });

            const { name, job, id, createdAt }: UserResponseType = response.body;

            new ResponseAssert(response)
                .timeIsLessThan(startTime, RESPONSE.TIME)
                .statusCodeIs(RESPONSE.CODE)
                .typeIs(RESPONSE.TYPE)
                .schemaIs(userschema)
                .toEqual(name, user.name)
                .toEqual(job, user.job)
                .isNotEmpty(id)
                .isNotEmpty(createdAt);
        })
    })

})