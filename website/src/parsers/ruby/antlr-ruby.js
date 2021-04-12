
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "rb",
  parserName: "ruby",
  id: "antlr-ruby",
  displayName: "antlr-ruby"
}