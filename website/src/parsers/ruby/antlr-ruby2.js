
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "rb2",
  id: "antlr-ruby2",
  displayName: "antlr-ruby2"
}