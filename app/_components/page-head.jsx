export default function PageHead({ title, description }) {
  return (
    <>
      <title>{title ? `${title} • The Golden Hive` : "The Golden Hive"}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta name="theme-color" content="#FFB300" />
    </>
  )
}
