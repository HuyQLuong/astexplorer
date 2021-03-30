
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "py",
  id: "antlr-parser-python",
  displayName: "antlr-parser-python"
}