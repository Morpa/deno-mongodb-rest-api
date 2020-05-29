export default interface INotes {
  _id?: {
    $oid: string;
  };
  title: string;
  content: string;
  date?: Date;
}
