import JoinForm from "@/components/JoinForm";
import withUnauthenticated from "@/components/hocs/withUnauthenticated";

const JoinPage = () => <JoinForm/>;

export default withUnauthenticated(JoinPage);