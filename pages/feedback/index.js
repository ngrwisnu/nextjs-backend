import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const feedbackDetailsHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.feedback}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.email}{" "}
            <button onClick={feedbackDetailsHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
