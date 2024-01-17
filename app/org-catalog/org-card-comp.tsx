import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Orgs } from "@/lib/firebase/schema";

export default function OrgCardComp(props: Orgs) {
  return (
    <Card>
      <CardHeader>
        <CardDescription># Members</CardDescription>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        Org Description
        <div>
          <Badge variant="outline">Time Commitment</Badge>
          <Badge variant="outline">Org Type</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">More Info</Button>
        Comp Progress <Progress value={33} /> 33%
      </CardFooter>
    </Card>
  );
}
