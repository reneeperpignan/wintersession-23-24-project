import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Orgs } from "@/lib/firebase/schema";
import { Toggle } from "@/components/ui/toggle"


export default function OrgCardCurrent(props: Orgs) {
  // Calculate the number of members
  const MemberCount = props.members.length;

  return (
    <Card>
      <CardHeader>
        <Toggle>&#9734;</Toggle>
        <CardDescription>{`${MemberCount} Members`}</CardDescription>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {props.description}
        <div>
          {/* Unclear if badges are needed on this page */}
          <Badge variant="outline">idk if this is necessary</Badge>
          {/* <Badge variant="outline">Org Type</Badge> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">More Info</Button>
      </CardFooter>
    </Card>
  );
}
