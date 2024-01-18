import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Orgs } from "@/lib/firebase/schema";
import { Toggle } from "@/components/ui/toggle"


export default function OrgCardComp(props: Orgs) {
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
          <Badge variant="outline">{props.timelower} - {props.timeupper} hrs/week</Badge>
          <Badge variant="outline">{props.comptype}</Badge>
          <Badge variant="outline">{props.type}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">More Info</Button>
        Comp Progress <Progress value={33} /> 33%
      </CardFooter>
    </Card>
  );
}
