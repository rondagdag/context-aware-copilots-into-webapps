// app/spells/edit/[id]/page.tsx
import SpellForm from '../../../../components/SpellForm';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { use } from 'react';

export default function EditSpellPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CopilotKit runtimeUrl="/api/copilotkit">
    <CopilotSidebar
      instructions={"Help the user catalog Harry Potter Spells"}
      labels={{
        initial:
          "Hello",
      }}
      defaultOpen={true}
      clickOutsideToClose={false}>
      <SpellForm isEditMode={true} spellId={id} />
    </CopilotSidebar>
  </CopilotKit>;
}
