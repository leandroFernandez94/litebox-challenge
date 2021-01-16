import dbConnect from "./utils/dbConnect"
import MyList from './models/MyList'

export default async function getMyList (__, res) {
  await dbConnect()

  const data = await MyList.find({})

  res.statusCode = 200
  res.json({ data });
}
