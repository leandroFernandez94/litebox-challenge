import MyList from "./models/MyList"
import dbConnect from "./utils/dbConnect"

export default async function postMovie(req, res) {
  await dbConnect()

  try {
    const movie = await MyList.create(
      {
        title: req.body.title,
        category: req.body.category,
        posterUrl: `${process.env.BUCKET_PUBLIC_DOMAIN}${req.body.filename}`
      }
    )

    res.status(201).json({ success: true, data: movie })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false })
  }
}