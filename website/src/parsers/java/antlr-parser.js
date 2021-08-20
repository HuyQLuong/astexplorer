
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "java",
  id: "antlr-parser-java",
  displayName: "antlr-parser-java"
}