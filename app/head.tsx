export default function Head() {
  return (
    <>
      <title>Cocov</title>
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/site.webmanifest" rel="manifest" />
      <meta
        content={process.env.COCOV_PUBLIC_API_URL as string}
        name="cocov-api-beacon"
      />
    </>
  )
}
