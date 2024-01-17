import { type Orgs } from "@/lib/firebase/schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";


export default function OrgCardCurrent() {
    return (
        <Card>
            <CardHeader>
                <CardDescription># Members</CardDescription>
                <CardTitle>Org Name</CardTitle>
            </CardHeader>
            <CardContent>
                Org Description
                <div>
                    <Badge variant="outline">idk if this is necessary</Badge>
                    {/* <Badge variant="outline">Org Type</Badge> */}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline">More Info</Button>
            </CardFooter>
        </Card>
        
    );
};