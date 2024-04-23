import withAuthenticatedUser, {AuthenticatedUserProps} from "@/components/hocs/withAuthenticatedUser";
import NoteIndexTemplate from "@/pages/notes/NoteIndex.template";

const NoteIndexPage = ({currentUser}: AuthenticatedUserProps) => <NoteIndexTemplate currentUser={currentUser.email}/>;

export default withAuthenticatedUser(NoteIndexPage);