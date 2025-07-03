// submit.js

export const SubmitButton = () => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                type="submit"
                style={{
                border: 'none',
                backgroundColor: '#6366f1',
                color: 'white',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                }}
            >
                Submit
            </button>
        </div>
    );
}
