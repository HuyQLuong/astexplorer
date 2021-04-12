
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "rb",
  parserName: "jruby",
  id: "antlr-jruby",
  displayName: "antlr-jruby"
}