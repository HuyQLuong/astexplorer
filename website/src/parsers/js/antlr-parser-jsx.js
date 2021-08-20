
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "jsx",
  id: "antlr-parser-jsx",
  displayName: "antlr-parser-jsx"
}