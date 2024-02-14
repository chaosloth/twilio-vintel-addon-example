export enum BadgeVariantsStrings {
  "neutral",
  "warning",
  "error",
  "success",
  "new",
  "subaccount",
  "decorative10",
  "decorative20",
  "decorative30",
  "decorative40",
  "neutral_counter",
  "error_counter",
  "default",
  "info",
}

export default (emotion: string) => {
  switch (emotion) {
    case "Admiration":
      return "success";
    case "Adoration":
      return "success";
    case "Aesthetic Appreciation":
      return "decorative10";
    case "Amusement":
      return "success";
    case "Anger":
      return "error";
    case "Annoyance":
      return "warning";
    case "Anxiety":
      return "warning";
    case "Awe":
      return "success";
    case "Awkwardness":
      return "neutral";
    case "Boredom":
      return "neutral";
    case "Calmness":
      return "neutral";
    case "Concentration":
      return "neutral";
    case "Confusion":
      return "neutral";
    case "Contemplation":
      return "neutral";
    case "Contempt":
      return "error";
    case "Contentment":
      return "neutral";
    case "Craving":
      return "neutral";
    case "Desire":
      return "neutral";
    case "Determination":
      return "neutral";
    case "Disappointment":
      return "error";
    case "Disapproval":
      return "warning";
    case "Disgust":
      return "warning";
    case "Distress":
      return "error";
    case "Doubt":
      return "warning";
    case "Ecstasy":
      return "neutral";
    case "Embarrassment":
      return "warning";
    case "Empathic Pain":
      return "neutral";
    case "Enthusiasm":
      return "success";
    case "Entrancement":
      return "neutral";
    case "Envy":
      return "warning";
    case "Excitement":
      return "success";
    case "Fear":
      return "warning";
    case "Gratitude":
      return "success";
    case "Guilt":
      return "neutral";
    case "Horror":
      return "warning";
    case "Interest":
      return "neutral";
    case "Joy":
      return "success";
    case "Love":
      return "success";
    case "Nostalgia":
      return "neutral";
    case "Pain":
      return "neutral";
    case "Pride":
      return "neutral";
    case "Realization":
      return "neutral";
    case "Relief":
      return "neutral";
    case "Romance":
      return "neutral";
    case "Sadness":
      return "warning";
    case "Sarcasm":
      return "neutral";
    case "Satisfaction":
      return "success";
    case "Shame":
      return "warning";
    case "Surprise (negative)":
      return "warning";
    case "Surprise (positive)":
      return "success";
    case "Sympathy":
      return "success";
    case "Tiredness":
      return "neutral";
    case "Triumph":
      return "neutral";
    default:
      return "neutral";
  }
};
