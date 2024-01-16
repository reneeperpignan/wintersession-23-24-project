import { type Orgs } from "@/lib/firebase/schema";

function org_card(props: Orgs) {
  return (
    <div class="card">
      {/* Eventually we'll have an image here */}
      <div class="container">
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default org_card;
