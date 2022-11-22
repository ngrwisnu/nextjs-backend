import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.email}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
