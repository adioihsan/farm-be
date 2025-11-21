import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const plainPassword = 'Admin@123' 
  const email = 'admin@admin.com'   
  const name = 'Admin User'           

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {}, 
    create: {
      email,
      name,
      password: hashedPassword,
    },
  })

  console.log('User created (or found):', user)

  const farmsData = Array.from({ length: 50 }).map(() => ({
    userId: user.id,
    farmName: faker.company.name(),
    ownerName: faker.person.fullName(),
    location: faker.location.city(),
    isPartner: faker.datatype.boolean(),
  }))

  await prisma.farm.createMany({
    data: farmsData,
  })

  console.log('50 farms created')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
