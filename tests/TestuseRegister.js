import { renderHook } from "@testing-library/react-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { useRegister } from "./useRegister";

jest.mock("@tanstack/react-query", () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

jest.mock("react-native-root-toast", () => ({
    show: jest.fn(),
}));

describe("useRegister hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return correct initial values", () => {
        useMutation.mockReturnValueOnce({
            mutate: jest.fn(),
            isLoading: false,
        });

        useQueryClient.mockReturnValueOnce({
            setQueryData: jest.fn(),
        });

        useNavigation.mockReturnValueOnce({
            navigate: jest.fn(),
        });

        const { result } = renderHook(() => useRegister());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe("");
    });

    it("should call register function and navigate to login on successful registration", async () => {
        const mockUser = { id: 1, email: "test@example.com" };

        useMutation.mockReturnValueOnce({
            mutate: jest.fn().mockResolvedValue(mockUser),
            isLoading: false,
        });

        const mockSetQueryData = jest.fn();
        useQueryClient.mockReturnValueOnce({
            setQueryData: mockSetQueryData,
        });

        const mockNavigate = jest.fn();
        useNavigation.mockReturnValueOnce({
            navigate: mockNavigate,
        });

        const { result, waitForNextUpdate } = renderHook(() => useRegister());

        result.current.register();

        await waitForNextUpdate();

        expect(useMutation).toHaveBeenCalledWith({
            mutationFn: expect.any(Function),
            onSuccess: expect.any(Function),
            onError: expect.any(Function),
        });

        expect(mockSetQueryData).toHaveBeenCalledWith(["user"], mockUser);
        expect(Toast.show).toHaveBeenCalledWith("Account Created Successfully");
        expect(mockNavigate).toHaveBeenCalledWith("Login");
    });

    it("should handle registration error", async () => {
        const mockError = new Error("Registration failed");

        useMutation.mockReturnValueOnce({
            mutate: jest.fn().mockRejectedValue(mockError),
            isLoading: false,
        });

        const { result, waitForNextUpdate } = renderHook(() => useRegister());

        result.current.register();

        await waitForNextUpdate();

        expect(useMutation).toHaveBeenCalledWith({
            mutationFn: expect.any(Function),
            onSuccess: expect.any(Function),
            onError: expect.any(Function),
        });

        expect(Toast.show).toHaveBeenCalledWith("error");
    });
});
