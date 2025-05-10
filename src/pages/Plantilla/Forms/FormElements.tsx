import PageBreadcrumb from "../../../shared/ui/common/PageBreadCrumb.tsx";
import DefaultInputs from "../../../shared/ui/form/form-elements/DefaultInputs.tsx";
import InputGroup from "../../../shared/ui/form/form-elements/InputGroup.tsx";
import DropzoneComponent from "../../../shared/ui/form/form-elements/DropZone.tsx";
import CheckboxComponents from "../../../shared/ui/form/form-elements/CheckboxComponents.tsx";
import RadioButtons from "../../../shared/ui/form/form-elements/RadioButtons.tsx";
import ToggleSwitch from "../../../shared/ui/form/form-elements/ToggleSwitch.tsx";
import FileInputExample from "../../../shared/ui/form/form-elements/FileInputExample.tsx";
import SelectInputs from "../../../shared/ui/form/form-elements/SelectInputs.tsx";
import TextAreaInput from "../../../shared/ui/form/form-elements/TextAreaInput.tsx";
import InputStates from "../../../shared/ui/form/form-elements/InputStates.tsx";
import PageMeta from "../../../shared/ui/common/PageMeta.tsx";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
