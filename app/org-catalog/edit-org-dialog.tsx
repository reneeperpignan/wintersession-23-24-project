import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase/firestore";
import { type Orgs } from "@/lib/firebase/schema";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditProps {
  id: string;
  org: Orgs;
  onClose: () => void;
}

export default function EditOrgDialog({ id, org, onClose }: EditProps) {
  //dropdowns
  const [position, setPosition] = useState("bottom");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [comptype, setComptype] = useState("");
  const [meetingday, setMeetingday] = useState("");
  const [meetingtime, setMeetingtime] = useState("");
  const [timelower, setTimelower] = useState(0);
  const [timeupper, setTimeupper] = useState(0);
  const [mailinglist, setMailinglist] = useState("");
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState("");

  //more intuitive way:
  // const [open, setOpen] = useState(true);
  const router = useRouter();

  const onSubmit = async () => {
    const docRef = doc(db, "orgs", id);

    console.log(docRef);
    console.log(id);

    const orgdata = {
      name: name ? name : org.name,
      description: description ? description : org.description,
      type: type ? type : org.type,
      comptype: comptype ? comptype : org.comptype,
      meetingday: meetingday ? meetingday : org.meetingday,
      meetingtime: meetingtime ? meetingtime : org.meetingtime,
    };

    await updateDoc(docRef, orgdata)
      .then(() => {
        console.log("Value of an Existing Document Field has been updated");
        alert("The club is being edited - may take a few moments to update.");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error. Please try again.")
      });

      onClose();

    router.refresh();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogHeader>
        <DialogTitle>Edit {org ? org.name : ""}</DialogTitle>
      </DialogHeader>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              className="col-span-3"
              type="text"
              id="name"
              placeholder={org.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              className="resize=none col-span-3"
              id="description"
              placeholder={org.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="col-span-3">
                <Button variant="outline">{type}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose the type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="pre-professional" onClick={() => setType("Pre-professional")}>
                    Pre-Professional
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="music" onClick={() => setType("Music")}>
                    Music
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sports" onClick={() => setType("Sports")}>
                    Sports
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="other" onClick={() => setType("Other")}>
                    Other
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comptype" className="text-right">
              Comp Type
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="col-span-3">
                <Button variant="outline">{comptype}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose the comp type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="competitive" onClick={() => setComptype("Competitive")}>
                    Competitive
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="completion" onClick={() => setComptype("Completion")}>
                    Completion
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="none" onClick={() => setComptype("None")}>
                    None
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meetingday" className="text-right">
              Meeting Day
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="col-span-3">
                <Button variant="outline">{meetingday}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose a day</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="sun" onClick={() => setMeetingday("Sunday")}>
                    Sunday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="mon" onClick={() => setMeetingday("Monday")}>
                    Monday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="tues" onClick={() => setMeetingday("Tuesday")}>
                    Tuesday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="wed" onClick={() => setMeetingday("Wednesday")}>
                    Wednesday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="thu" onClick={() => setMeetingday("Thursday")}>
                    Thursday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="fri" onClick={() => setMeetingday("Friday")}>
                    Friday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sat" onClick={() => setMeetingday("Saturday")}>
                    Saturday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="tbd" onClick={() => setMeetingday("Tbd")}>
                    Tbd
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meetingtime" className="text-right">
              Meeting Time
            </Label>
            <Input
              className="col-span-3"
              type="text"
              id="meetingtime"
              placeholder={org.meetingtime}
              onChange={(e) => setMeetingtime(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meetingtime" className="text-right col-span-1">
              Time Commitment
            </Label>
            <div className="col-span-3 flex">
              <Input
                type="number"
                className="w-20"
                id="timelower"
                value={timelower}
                onChange={(e) => setTimelower(Number(e.target.value))}
              />
              <Label className="align-center">-</Label>
              <Input
                type="number"
                className="w-20"
                id="timeupper"
                value={timeupper}
                onChange={(e) => setTimeupper(Number(e.target.value))}
              />
              <Label>hours per week</Label>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mailinglist" className="text-right">
              Mailing List
            </Label>
            <Input
              type="text"
              id="mailinglist"
              placeholder={org.mailinglist}
              className="col-span-3"
              value={mailinglist}
              onChange={(e) => setMailinglist(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Logo (Image URL)
            </Label>
            <Input
              type="text"
              id="logo"
              placeholder={org.logo}
              className="col-span-3"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website (URL)
            </Label>
            <Input
              type="text"
              id="website"
              placeholder={org.website}
              className="col-span-3"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

        </div>
        <div className="flex">
          <Button type="button" className="ml-1 mr-1 flex-auto" onClick={() => void onSubmit()}>
            Update
          </Button>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

