import databaseConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { userValidation } from "@/Schemas/signUpSchema";
import { join } from "path";

const UsernameQuerySchema = z.object({
    username : userValidation //username should fullfil the requirements of userValidation.
})

export async function GET(request:Request){
    await databaseConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam= {
            username : searchParams.get('username')
        }
        //validitating with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result); //TODO:check/remove
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success : false,
                    message : usernameErrors?.length > 0? usernameErrors.join(', '): 'Invalid Query Parameters',
                }
            )
        }

        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success : false,
                    message : 'Username is already taken'
                },
                {status : 500}
            )
        }
        return Response.json(
            {
                success : true,
                message : 'Username is available ✅'
            },
            {status : 500})

    } catch (error) {
        console.error("Error finiding Username" , error)
        return Response.json(
            {
                success : false,
                messages : "Error finding Username"
            },
            {status : 500}
        )
    }
}