"use client";

export default function Home() {
  return (
    <>
      {/* <TypographyH2>Welcome to the T4SG starter project!</TypographyH2>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
        your own components!
      </TypographyP>
      <TypographyP>
        This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
        routes!
      </TypographyP> */}
      <div
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          width: "40%",
          borderRadius: "5px",
        }}
        className="card"
      >
        {/* Eventually we'll have an image here */}
        <div style={{ borderRadius: "5px 5px 0 0" }} className="container">
          <h4>
            <b>T4SG</b>
          </h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis earum dignissimos ducimus esse numquam ea
            temporibus illum! Ipsa, dolorum eius, minus unde eveniet aperiam praesentium cumque ex, nam expedita
            quaerat.
          </p>
        </div>
      </div>
    </>
  );
}
