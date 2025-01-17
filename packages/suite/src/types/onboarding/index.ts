import * as STEP from '@onboarding-constants/steps';

export type ConnectedDeviceStatus =
    | 'unreadable'
    | 'in-bootloader'
    | 'seedless'
    | 'initialized'
    | 'ok';

export interface Step {
    id: AnyStepId;
    stepGroup: number | undefined;
    disallowedDeviceStates?: AnyStepDisallowedState[];
    path?: AnyPath[];
}

export type AnyStepId =
    | typeof STEP.ID_WELCOME_STEP
    | typeof STEP.ID_CREATE_OR_RECOVER
    | typeof STEP.ID_BACKUP_STEP
    | typeof STEP.ID_FINAL_STEP
    | typeof STEP.ID_FIRMWARE_STEP
    | typeof STEP.ID_SET_PIN_STEP
    | typeof STEP.ID_SECURITY_STEP
    | typeof STEP.ID_RESET_DEVICE_STEP
    | typeof STEP.ID_RECOVERY_STEP
    | typeof STEP.ID_COINS_STEP;

export type AnyStepDisallowedState =
    | typeof STEP.DISALLOWED_DEVICE_IS_IN_BOOTLOADER
    | typeof STEP.DISALLOWED_DEVICE_IS_NOT_CONNECTED
    | typeof STEP.DISALLOWED_DEVICE_IS_NOT_USED_HERE
    // | typeof STEP.DISALLOWED_DEVICE_IS_NOT_NEW_DEVICE
    | typeof STEP.DISALLOWED_DEVICE_IS_IN_RECOVERY_MODE
    | typeof STEP.DISALLOWED_IS_NOT_SAME_DEVICE;

export type AnyPath = typeof STEP.PATH_CREATE | typeof STEP.PATH_RECOVERY;
