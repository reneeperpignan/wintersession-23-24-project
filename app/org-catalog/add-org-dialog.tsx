"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useState, type SyntheticEvent } from "react";
import ClubAlert from "./alert";

async function addDatatoFirestore(
  name: string,
  description: string,
  directors: string[],
  comping: string[],
  members: string[],
  mailinglist: string,
  type: string,
  comptype: string,
  meetingday: string,
  meetingtime: string,
  timelower: number,
  timeupper: number,
  logo: string,
  website: string,
) {
  try {
    const docRef = await addDoc(collection(db, "orgs"), {
      name: name,
      description: description,
      directors: directors,
      comping: comping,
      mailinglist: mailinglist,
      members: members,
      type: type,
      comptype: comptype,
      meetingday: meetingday,
      meetingtime: meetingtime,
      timelower: timelower,
      timeupper: timeupper,
      logo: logo,
      website: website,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

export default function AddOrgDialog() {
  const { toast } = useToast();

  //dropdpown
  const [position, setPosition] = useState("bottom");

  //thing
  // const [isFormOpen, setIsFormOpen] = useState(false);

  // State variables to store form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [comping, setComping] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [mailinglist, setMailinglist] = useState("");
  const [type, setType] = useState("Type");
  const [comptype, setComptype] = useState("");
  const [meetingday, setMeetingday] = useState("");
  const [meetingtime, setMeetingtime] = useState("");
  const [timelower, setTimelower] = useState(0);
  const [timeupper, setTimeupper] = useState(0);
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState("");

  const addOrgHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (name == "") {
      toast({
        title: "Bruh.",
        description: `You must have a name. `,
      });
      return;
    }

    const added = await addDatatoFirestore(
      name,
      description,
      directors,
      comping,
      members,
      mailinglist,
      type,
      comptype,
      meetingday,
      meetingtime,
      timelower,
      timeupper,
      logo,
      website,
    );
    if (added) {
      // toast({
      //   title: "Success!",
      //   description: `${name} was added.`,
      // });

      setIsDialogOpen(true);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setMembers([]);
    setMailinglist("");
    setType("");
    setComptype("");
    setMeetingday("");
    setMeetingtime("");
    setTimelower(0);
    setTimeupper(0);
    setLogo("");
    setWebsite("");

    // toast({
    //   title: "Data reset",
    // });
  };

  function handleFormReset() {
    setName("");
    setDescription("");
    setDirectors([]);
    setComping([]);
    setMembers([]);
    setMailinglist("");
    setType("");
    setComptype("");
    setMeetingday("");
    setMeetingtime("");
    setTimelower(0);
    setTimeupper(0);
    setLogo("");
    setWebsite("");
  }

  return (
    <div>
      <ClubAlert
        name={name}
        type={type}
        comptype={comptype}
        description={description}
        meetingday={meetingday}
        meetingtime={meetingtime}
        logo={logo}
        website={website}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => void handleFormReset()}>
            Register Org
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add an org</DialogTitle>
            <DialogDescription>Add information about your club. Click save to add it to the catalog.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e: SyntheticEvent) => void addOrgHandler(e)} className="max-h-80 overflow-y-scroll">
            <div className="grid gap-4  py-4	">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Tech For Social Good"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Input
                  type="text"
                  id="description"
                  placeholder="Work with clients to create tech for social impact"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailinglist" className="text-right">
                  Mailing List
                </Label>
                <Input
                  type="text"
                  id="mailinglist"
                  placeholder="something@list.org"
                  className="col-span-3"
                  value={mailinglist}
                  onChange={(e) => setMailinglist(e.target.value)}
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
                      <DropdownMenuRadioItem value="Competitive" onClick={() => setComptype("Competitive")}>
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
                        Sunday{" "}
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
                  Meeting Time:
                </Label>
                <Input
                  type="text"
                  id="meetingtime"
                  placeholder="7:30, 2:00, etc."
                  className="col-span-3"
                  value={meetingtime}
                  onChange={(e) => setMeetingtime(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meetingtime" className="text-right">
                  Time Commitment: Between
                </Label>
                <Input
                  type="number"
                  id="timelower"
                  placeholder="7:30am, 2:00pm, etc."
                  className="col-span-3"
                  value={timelower}
                  onChange={(e) => setTimelower(Number(e.target.value))}
                />{" "}
                and{" "}
                <Input
                  type="number"
                  id="timeupper"
                  placeholder="7:30am, 2:00pm, etc."
                  className="col-span-3"
                  value={timeupper}
                  onChange={(e) => setTimeupper(Number(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo" className="text-right">
                  Logo url:
                </Label>
                <Input
                  type="text"
                  id="logo"
                  placeholder="www.google.com"
                  className="col-span-3"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">
                  Website:{" "}
                </Label>
                <Input
                  type="text"
                  id="website"
                  placeholder="www.google.com"
                  className="col-span-3"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              {/* stretch goal??? */}
              <DialogTrigger>
                <Button type="button" onClick={(e) => void handleReset(e)}>
                  Clear
                </Button>
              </DialogTrigger>

              <DialogClose asChild>
                <Button type="submit">Add organization</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// <div>
// {/* {isDialogOpen && formData && (
//   <ClubAlert formData={formData} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
// )} */}
// <div className="mt-4 self-end">
//   {/* Align button and form to the right */}
//   <Button variant="outline" onClick={handleClick}>
//     Register club
//   </Button>
//   <Dialog open={isFormOpen}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Register new club</DialogTitle>
//         <DialogDescription>Information will be added to our database.</DialogDescription>
//       </DialogHeader>
//       <DialogFooter>
//         <AddForm onSubmit={() => void handleSubmit} />
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
// </div>
// </div>
