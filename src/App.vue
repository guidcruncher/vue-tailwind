<script setup lang="ts">
import { ref } from "vue"
import { toast } from "./stores/toast"
import { registerCommand } from "./stores/commands"
import { pushNotification } from "./stores/notifications"
import { gcUUID } from "./utils/uuid"

const color = ref()
const role = ref("admin")
const enabled = ref()
const permissions = ref("")
const birthday = ref()
const startTime = ref()
const tz = ref("Europe/London")
const combo = ref()

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
]

/* Modal */
const modalOpen = ref(false)

/* DataTable */
const page = ref(1)
const pageSize = 5

const rows = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 2 ? "Active" : "Inactive",
}))

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "status", label: "Status", sortable: true },
]

/* Command Palette Commands */

registerCommand({
  id: "open",
  label: "Open Demo Modal",
  action: () => (modalOpen.value = true),
})

registerCommand({
  id: "trigger",
  label: "Trigger Notification",
  action: () =>
    pushNotification({
      id: gcUUID(),
      title: "New Message",
      message: "You have a new notification",
    }),
})

registerCommand({
  id: "toast",
  label: "Show Toast",
  action: () => toast.success("Toast from Command Palette"),
})
</script>

<template>
  <GcAppShell>
    <!-- NAVBAR -->
    <template #navbar>
      <GcNavbar sticky>
        <template #left>
          <span class="gc-navbar-brand">Demo Suite</span>
        </template>

        <template #right>
          <GcNotificationButton />
          <GcNotificationFlyout />
          <GcCommandPalette />
          <GcThemeSwitcher />
        </template>
      </GcNavbar>
    </template>

    <!-- SIDEBAR -->
    <template #sidebar="{ collapsed, toggle }">
      <GcSidebar :collapsed="collapsed" @toggle="toggle">
        <template #header>
          <span class="font-bold">Menu</span>
        </template>

        <template #content>
          <GcSidebarItem icon="Home" text="Dashboard" />
          <GcSidebarItem icon="Component" text="Components" />
          <GcSidebarItem icon="Settings" text="Settings" />
        </template>
      </GcSidebar>
    </template>

    <!-- MAIN CONTENT -->
    <div class="p-6 space-y-12">
      <div>
        <GcBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: 'Project A' },
          ]"
        />
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Carousel</h2>
        <GcCarousel autoplay interval="3000">
          <div class="gc-carousel-slide bg-red-500 h-64"></div>
          <div class="gc-carousel-slide bg-blue-500 h-64"></div>
          <div class="gc-carousel-slide bg-green-500 h-64"></div>
        </GcCarousel>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Clock</h2>
        <GcSelect
          v-model="tz"
          :options="[
            { label: 'London', value: 'Europe/London' },
            { label: 'New York', value: 'America/New_York' },
            { label: 'Tokyo', value: 'Asia/Tokyo' },
          ]"
        />

        <GcDigitalClock :timezone="tz" showSeconds />
      </div>

      <!-- ACTIONS -->
      <section>
        <h2 class="text-xl font-bold mb-4">Actions</h2>

        <div class="flex gap-4">
          <GcDropdown>
            <template #trigger> Actions </template>
            <GcDropdownItem @select="toast.info('Edit clicked')"> Edit </GcDropdownItem>
            <GcDropdownItem @select="toast.info('Duplicate clicked')"> Duplicate </GcDropdownItem>
            <div class="gc-dropdown-divider"></div>
            <GcDropdownItem danger @select="toast.error('Deleted')"> Delete </GcDropdownItem>
          </GcDropdown>

          <GcPopover placement="bottom">
            <template #trigger>Popover</template>
            <p class="text-muted">Popover content here</p>
          </GcPopover>

          <GcFlyout placement="right">
            <template #trigger>Flyout</template>
            <p class="text-muted">Flyout panel content</p>
          </GcFlyout>

          <GcButton @click="modalOpen = true">Open Modal</GcButton>
        </div>
      </section>

      <!-- MODAL -->
      <GcModal v-model="modalOpen">
        <template #header>
          <h2 class="text-xl font-bold">Demo Modal</h2>
        </template>

        <p>This is a modal inside the demo page.</p>

        <template #footer>
          <GcButton @click="modalOpen = false">Close</GcButton>
        </template>
      </GcModal>

      <!-- TABS + ACCORDION -->
      <section>
        <h2 class="text-xl font-bold mb-4">Tabs and Accordion</h2>

        <GcTabs :defaultIndex="0">
          <GcTabList>
            <GcTab :index="0">Overview</GcTab>
            <GcTab :index="1">Details</GcTab>
            <GcTab :index="2">More</GcTab>
          </GcTabList>

          <GcTabPanels>
            <GcTabPanel :index="0">
              <div class="p-4 rounded">Overview content</div>
            </GcTabPanel>

            <GcTabPanel :index="1">
              <div class="p-4 rounded">Details content</div>
            </GcTabPanel>

            <GcTabPanel :index="2">
              <div class="p-4 rounded">More content</div>
            </GcTabPanel>
          </GcTabPanels>
        </GcTabs>

        <GcAccordion>
          <GcAccordionItem id="general">
            <template #title>General Settings</template>
            <p>General settings content goes here.</p>
          </GcAccordionItem>

          <GcAccordionItem id="billing">
            <template #title>Billing</template>
            <p>Billing content goes here.</p>
          </GcAccordionItem>

          <GcAccordionItem id="security">
            <template #title>Security</template>
            <p>Security content goes here.</p>
          </GcAccordionItem>
        </GcAccordion>
      </section>

      <!-- DATATABLE + PAGINATION -->
      <section>
        <h2 class="text-xl font-bold mb-4">Data Table</h2>

        <GcDataTable
          :rows="rows"
          :columns="columns"
          :page="page"
          :pageSize="pageSize"
          selectable
          @update:page="page = $event"
        />

        <GcPagination v-model:page="page" :pageSize="pageSize" :total="rows.length" />
      </section>

      <!-- WIZARD -->
      <section>
        <h2 class="text-xl font-bold mb-4">Wizard</h2>

        <GcWizard>
          <GcWizardStep :index="0" title="Step 1">
            <div class="p-4 rounded">Step 1 content</div>
            <GcWizardNav />
          </GcWizardStep>

          <GcWizardStep :index="1" title="Step 2">
            <div class="p-4 rounded">Step 2 content</div>
            <GcWizardNav />
          </GcWizardStep>

          <GcWizardStep :index="2" title="Step 3">
            <div class="p-4 rounded">Step 3 content</div>
            <GcWizardNav />
          </GcWizardStep>
        </GcWizard>

        <!-- EXTRA COMPONENTS SHOWCASE -->
        <section class="space-y-12">
          <!-- ALERTS -->
          <div>
            <h2 class="text-xl font-bold mb-4">Alerts</h2>
            <GcAlert type="success">Success alert example</GcAlert>
            <GcAlert type="info" class="mt-2">Info alert example</GcAlert>
            <GcAlert type="danger" class="mt-2">Danger alert example</GcAlert>
          </div>

          <div>
            <h2 class="text-xl font-bold mb-4">Callouts</h2>

            <GcCallout variant="info" title="Heads up!">
              <template #icon>
                <GcIcon name="Info" class="gc-callout-icon" />
              </template>
              This is an informational callout.
            </GcCallout>

            <GcCallout variant="success" title="All good!">
              Everything saved successfully.
            </GcCallout>

            <GcCallout variant="warning" dismissible>
              <template #icon>
                <GcIcon name="AlertTriangle" class="gc-callout-icon" />
              </template>
              Your subscription is about to expire.
              <template #close-icon>
                <GcIcon name="X" class="w-4 h-4" />
              </template>
            </GcCallout>

            <GcCallout variant="danger" dismissible>
              <template #icon>
                <GcIcon name="AlertTriangle" class="gc-callout-icon" />
              </template>
              Your server has crashed
              <template #close-icon>
                <GcIcon name="X" class="w-4 h-4" />
              </template>
            </GcCallout>

            <GcCallout variant="muted"> This is a low‑priority note. </GcCallout>
          </div>

          <!-- AVATAR + BADGE -->
          <div>
            <h2 class="text-xl font-bold mb-4">Avatar & Badge</h2>
            <div class="flex items-center gap-6">
              <GcAvatar src="https://i.pravatar.cc/100" alt="User" />
            </div>
          </div>

          <!-- CARD -->
          <div>
            <h2 class="text-xl font-bold mb-4">Card</h2>
            <GcCard>
              <h3 class="font-bold text-lg mb-2">Card Title</h3>
              <p class="text-muted">This is a card component example.</p>
            </GcCard>
          </div>

          <!-- INPUTS -->
          <div>
            <h2 class="text-xl font-bold mb-4">Inputs</h2>
            <GcInput placeholder="Text input" class="mb-4" />
            <GcTextarea placeholder="Textarea input" class="mb-4" />
            <GcSelect :options="roles" v-model="role" />

            <GcComboBox
              v-model="combo"
              :items="[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry' },
              ]"
              placeholder="Pick a fruit..."
            />

            <GcToggleSwitch v-model="enabled" size="sm" />
            <GcToggleSwitch v-model="enabled" />
            <GcToggleSwitch v-model="enabled" size="lg" />
            <div>
              <GcRadioGroup
                v-model="role"
                :options="[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Editor', value: 'editor' },
                  { label: 'Viewer', value: 'viewer' },
                ]"
              />
            </div>
            <div>
              <GcCheckboxGroup
                v-model="permissions"
                :options="[
                  { label: 'Read', value: 'read' },
                  { label: 'Write', value: 'write' },
                  { label: 'Delete', value: 'delete' },
                ]"
              />
            </div>
            <div>
              <GcTagChip label="Deployed" status="success" />
              <GcTagChip label="Pending" status="warning" />
              <GcTagChip label="Failed" status="danger" />
              <GcTagChip label="Beta" status="info" />
            </div>
            <div>
              <GcDatePicker v-model="birthday" size="sm" />
              <GcDatePicker v-model="birthday" />
              <GcDatePicker v-model="birthday" size="lg" />
            </div>

            <div>
              <GcTimePicker v-model="startTime" size="sm" />
              <GcTimePicker v-model="startTime" />
              <GcTimePicker v-model="startTime" size="lg" />
            </div>
          </div>

          <!-- TOOLTIP -->
          <div>
            <h2 class="text-xl font-bold mb-4">Tooltip</h2>
            <GcTooltip text="Tooltip content">
              <GcButton>Hover me</GcButton>
            </GcTooltip>
          </div>

          <!-- SPINNER + SKELETON -->
          <div>
            <h2 class="text-xl font-bold mb-4">Loading States</h2>
            <div class="flex items-center gap-6">
              <GcSpinner />
              <GcSkeleton class="w-48 h-6" />
            </div>
          </div>

          <!-- GRID + STACK -->
          <div>
            <h2 class="text-xl font-bold mb-4">Grid & Stack</h2>
            <GcGrid cols="3" gap="4">
              <GcCard>Grid Item 1</GcCard>
              <GcCard>Grid Item 2</GcCard>
              <GcCard>Grid Item 3</GcCard>
            </GcGrid>

            <GcStack direction="row" gap="4" class="mt-4">
              <GcCard>Stack 1</GcCard>
              <GcCard>Stack 2</GcCard>
              <GcCard>Stack 3</GcCard>
            </GcStack>
          </div>

          <div>
            <h2 class="text-xl font-bold mb-4">Responsive Grid</h2>
            <GcGridAuto>
              <GcCard v-for="i in 8" :key="i">Item {{ i }}</GcCard>
            </GcGridAuto>
          </div>

          <!-- SECTION -->
          <div>
            <h2 class="text-xl font-bold mb-4">Section</h2>
            <GcSection title="Section Title">
              <p>This is a section component example.</p>
            </GcSection>
          </div>

          <!-- STEPPER -->
          <div>
            <h2 class="text-xl font-bold mb-4">Stepper</h2>
            <GcStepper :defaultStep="0">
              <GcStep index="0" label="Account" />
              <GcStep index="1" label="Details" />
              <GcStep index="2" label="Confirm" />

              <GcStepPanel index="0"> Step 1 content </GcStepPanel>

              <GcStepPanel index="1"> Step 2 content </GcStepPanel>

              <GcStepPanel index="2"> Step 3 content </GcStepPanel>
            </GcStepper>
          </div>

          <div>
            <h2 class="text-xl font-bold mb-4">Virtual Scroll</h2>
            <ScrollerDemo />
          </div>

          <div>
            <h2 class="text-xl font-bold mb-4">Property List</h2>
            <GcPropertyList
              :items="[
                { label: 'Username', value: 'guidcruncher' },
                { label: 'Email', value: 'john@example.com', copyable: true },
                { label: 'Account Type', value: 'Pro' },
                { label: 'API Key', value: 'sk_live_12345', copyable: true },
              ]"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Tree View</h2>
            <GcTreeView
              :nodes="[
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: 'Settings',
                  children: [
                    { id: 'profile', label: 'Profile' },
                    { id: 'security', label: 'Security' },
                    {
                      id: 'billing',
                      label: 'Billing',
                      children: [
                        { id: 'invoices', label: 'Invoices' },
                        { id: 'payment', label: 'Payment Methods' },
                      ],
                    },
                  ],
                },
                {
                  id: 'projects',
                  label: 'Projects',
                  icon: 'Folder',
                  children: [
                    { id: 'alpha', label: 'Alpha' },
                    { id: 'beta', label: 'Beta' },
                  ],
                },
              ]"
              active="profile"
              @select="(id: any) => console.log('Selected:', id)"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-4">Color Picker</h2>
            <GcColorPicker v-model="color" />
            <p>Selected: {{ color }}</p>
          </div>

          <!-- GLOBAL TOASTS -->
          <div>
            <GcNotificationCenter />
          </div>
        </section>
      </section>
    </div>
    <GcToastContainer />
  </GcAppShell>
</template>
