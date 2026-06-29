import prisma from "../../lib/prisma";

export async function getDashboardStats(
    userId: string
) {

    const totalSolved =
        await prisma.problem.count({

            where: {

                userId,

                submissions: {

                    some: {

                        status: "Accepted"

                    }

                }

            }

        });

    return {

        totalSolved

    };

}