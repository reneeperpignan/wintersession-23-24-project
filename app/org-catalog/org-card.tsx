import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { type Orgs } from "@/lib/firebase/schema";

// Card for catalog and favorited page

interface OrgCardProps {
  organization: Orgs;
  uid: string;
  orgid: string;
}

export default function OrgCardCatalog({organization, uid, orgid}: OrgCardProps) {
  // Calculate the number of members
  const MemberCount = organization.members.length;

  // Can make a flex box to create boundaries of card
  return (
    <Card style={{ width: "200px" }}> 
      <CardHeader style={{ display: "flex", alignItems: "center" }}>
        <img src="/harvard-pic.jpg" style={{ width: "150px", marginRight: "10px" }} />
        <Toggle style={{ width: "50px" }}>&#9734;</Toggle>
        <CardDescription>{`${MemberCount} Members`}</CardDescription>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {organization.description}
        <div>
          <Badge variant="outline">{organization.timelower} - {organization.timeupper} hrs/week</Badge>
          <Badge variant="outline">{organization.comptype}</Badge>
          <Badge variant="outline">{organization.type}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">More Info</Button>
        <Button variant="outline">Comp/Join</Button>
      </CardFooter>
    </Card>
  );
}

// const clubTypes = ["Academic", "Sports", "Music", "Arts", "Professional", "Affinity", "Other"];
// const compTypes = ["Mail sign-up", "Completion comp", "Competitive comp"];
// const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Fridays", "Saturday", "Sunday"];

// function Form({ onSubmit }: FormProps) {
//   const [formData, setFormData] = React.useState<FormData>({
//     name: '',
//     description: '',
//     mailingList: '',
//     clubType: '',
//     website: '',
//     logo: undefined,
//     compType: '',
//     meetingDay: '',
//     meetingTime: '12:00',
//     timeLower: 0,
//     timeUpper: 0
//   });
